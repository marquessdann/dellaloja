import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { listLinkedMarketplaces } from "@/lib/store/queries";
import type { ChatCompletionTool } from "groq-sdk/resources/chat/completions";

// ============================================================
// Della IA is a SUPPORT/FAQ assistant only — not a product catalog and
// not an institutional presentation. Every function below is READ ONLY
// and scoped to that: store info, official sales channels, FAQ and
// support policies. None of them ever runs INSERT/UPDATE/DELETE.
// All Supabase access goes through the query builder (never raw SQL
// string concatenation), so user input can't reach the database as SQL.
// ============================================================

const MAX_LIMIT = 5;
const DEFAULT_LIMIT = 3;

function clampLimit(limit: unknown): number {
  const n = typeof limit === "number" && Number.isFinite(limit) ? Math.floor(limit) : DEFAULT_LIMIT;
  return Math.min(Math.max(n, 1), MAX_LIMIT);
}

async function searchFaq(args: { query: string; limit?: number }) {
  const supabase = getSupabaseAdmin();
  const limit = clampLimit(args.limit);
  const q = (args.query ?? "").trim();
  if (!q) return { results: [] };

  const { data: ftsData } = await supabase
    .from("faq")
    .select("question, answer, category")
    .eq("active", true)
    .textSearch("search_vector", q, { type: "websearch", config: "portuguese" })
    .limit(limit);

  if (ftsData && ftsData.length > 0) return { results: ftsData };

  const { data: likeData } = await supabase
    .from("faq")
    .select("question, answer, category")
    .eq("active", true)
    .or(`question.ilike.%${q}%,answer.ilike.%${q}%`)
    .limit(limit);

  return { results: likeData ?? [] };
}

const VALID_POLICY_TYPES = ["delivery", "returns", "exchanges", "payments", "privacy", "warranty"] as const;

async function getPolicy(args: { type: string }) {
  if (!VALID_POLICY_TYPES.includes(args.type as (typeof VALID_POLICY_TYPES)[number])) {
    return { found: false, reason: "invalid_type" };
  }
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("policies")
    .select("type, title, content")
    .eq("type", args.type)
    .maybeSingle();
  if (!data) return { found: false, reason: "not_registered" };
  return { found: true, policy: data };
}

async function getStoreInformation() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("store_information")
    .select(
      "name, address, phone, whatsapp, whatsapp_link, email, business_hours, instagram, instagram_link"
    )
    .eq("id", 1)
    .maybeSingle();
  return { store: data ?? null };
}

async function getMarketplaceLinks() {
  const marketplaces = await listLinkedMarketplaces();
  return { marketplaces: marketplaces.map((m) => ({ name: m.name, url: m.url })) };
}

// ============================================================
// Tool registry consumed by the API route
// ============================================================

export const chatTools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "search_faq",
      description: "Busca nas perguntas frequentes cadastradas pela Della.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
          limit: { type: "number" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_policy",
      description:
        "Consulta a política oficial cadastrada da Della para um tipo: delivery, returns, exchanges, payments, privacy ou warranty.",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: [...VALID_POLICY_TYPES],
          },
        },
        required: ["type"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_store_information",
      description:
        "Retorna nome, endereço, telefone/WhatsApp, e-mail, horário de atendimento e redes sociais reais da Della. Use para qualquer pergunta sobre localização, contato, horário ou suporte.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_marketplace_links",
      description:
        "Retorna os canais oficiais de venda (Mercado Livre, Shopee, TikTok Shop) já cadastrados, com link quando existir. Use sempre que o cliente perguntar onde/como comprar, ou se vendem em algum marketplace específico.",
      parameters: { type: "object", properties: {} },
    },
  },
];

type ToolArgs = Record<string, unknown>;

const toolHandlers: Record<string, (args: ToolArgs) => Promise<unknown>> = {
  search_faq: (args) => searchFaq(args as { query: string; limit?: number }),
  get_policy: (args) => getPolicy(args as { type: string }),
  get_store_information: () => getStoreInformation(),
  get_marketplace_links: () => getMarketplaceLinks(),
};

export async function executeTool(name: string, rawArgs: string): Promise<unknown> {
  const handler = toolHandlers[name];
  if (!handler) {
    return { error: `Ferramenta desconhecida: ${name}` };
  }
  let args: ToolArgs = {};
  try {
    args = rawArgs ? JSON.parse(rawArgs) : {};
  } catch {
    return { error: "Argumentos inválidos para a ferramenta." };
  }
  try {
    return await handler(args);
  } catch (err) {
    console.error(`[ai/tools] erro ao executar ${name}:`, err instanceof Error ? err.message : err);
    return { error: "Não foi possível consultar essa informação agora." };
  }
}
