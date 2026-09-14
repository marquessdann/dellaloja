import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { listLinkedMarketplaces, getMarketplacesForProduct } from "@/lib/store/queries";
import type { ChatCompletionTool } from "groq-sdk/resources/chat/completions";

// ============================================================
// Every function below is READ ONLY. None of them ever runs
// INSERT/UPDATE/DELETE against products, categories, faq, policies,
// marketplaces or store_information — the LLM has no tool capable of
// mutating catalog or store data, by construction, not just by prompt.
// All Supabase access goes through the query builder (never raw SQL
// string concatenation), so user input can't reach the database as SQL.
// ============================================================

export type ProductPayload = {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  category: string | null;
  categorySlug: string | null;
  shortDescription: string | null;
  price: number | null;
  promotionalPrice: number | null;
  available: boolean;
  stockQuantity: number | null;
  imageUrl: string | null;
  productUrl: string | null;
  marketplaceUrl: string | null;
};

const PRODUCT_SELECT =
  "id, slug, name, brand, short_description, price, promotional_price, available, stock_quantity, image_url, product_url, marketplace_url, categories(name, slug)";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProductPayload(row: any): ProductPayload {
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand ?? null,
    category: category?.name ?? null,
    categorySlug: category?.slug ?? null,
    shortDescription: row.short_description ?? null,
    price: row.price === null || row.price === undefined ? null : Number(row.price),
    promotionalPrice:
      row.promotional_price === null || row.promotional_price === undefined
        ? null
        : Number(row.promotional_price),
    available: Boolean(row.available),
    stockQuantity:
      row.stock_quantity === null || row.stock_quantity === undefined
        ? null
        : Number(row.stock_quantity),
    imageUrl: row.image_url ?? null,
    productUrl: row.product_url ?? null,
    marketplaceUrl: row.marketplace_url ?? null,
  };
}

const MAX_LIMIT = 10;
const DEFAULT_LIMIT = 5;

function clampLimit(limit: unknown): number {
  const n = typeof limit === "number" && Number.isFinite(limit) ? Math.floor(limit) : DEFAULT_LIMIT;
  return Math.min(Math.max(n, 1), MAX_LIMIT);
}

async function searchProducts(args: {
  query?: string;
  category_slug?: string;
  max_price?: number;
  limit?: number;
}) {
  const supabase = getSupabaseAdmin();
  const limit = clampLimit(args.limit);

  let categoryId: string | null = null;
  if (args.category_slug) {
    const { data } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", args.category_slug)
      .maybeSingle();
    if (!data) {
      return { products: [], count: 0, note: `Categoria "${args.category_slug}" não existe no catálogo.` };
    }
    categoryId = data.id;
  }

  let builder = supabase.from("products").select(PRODUCT_SELECT).eq("available", true);
  if (categoryId) builder = builder.eq("category_id", categoryId);
  if (typeof args.max_price === "number") builder = builder.lte("price", args.max_price);

  if (args.query && args.query.trim().length > 0) {
    const q = args.query.trim();
    const { data: ftsData } = await builder
      .textSearch("search_vector", q, { type: "websearch", config: "portuguese" })
      .limit(limit + 1);

    let rows = ftsData ?? [];
    if (rows.length === 0) {
      // Small catalog fallback: plain substring match for typos / partial
      // words that full-text search's stemming won't catch.
      let fallback = supabase.from("products").select(PRODUCT_SELECT).eq("available", true);
      if (categoryId) fallback = fallback.eq("category_id", categoryId);
      if (typeof args.max_price === "number") fallback = fallback.lte("price", args.max_price);
      const { data: likeData } = await fallback
        .or(`name.ilike.%${q}%,short_description.ilike.%${q}%,brand.ilike.%${q}%`)
        .limit(limit + 1);
      rows = likeData ?? [];
    }

    const hasMore = rows.length > limit;
    return {
      products: rows.slice(0, limit).map(toProductPayload),
      hasMore,
    };
  }

  const { data } = await builder.order("name", { ascending: true }).limit(limit + 1);
  const rows = data ?? [];
  const hasMore = rows.length > limit;
  return { products: rows.slice(0, limit).map(toProductPayload), hasMore };
}

async function getProductById(args: { id: string }) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", args.id)
    .maybeSingle();
  if (error || !data) return { found: false };
  return { found: true, product: toProductPayload(data) };
}

async function getProductBySlug(args: { slug: string }) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", args.slug)
    .maybeSingle();
  if (error || !data) return { found: false };
  return { found: true, product: toProductPayload(data) };
}

async function getProductsByCategory(args: { category_slug: string; limit?: number }) {
  return searchProducts({ category_slug: args.category_slug, limit: args.limit });
}

async function getProductPrice(args: { product_id: string }) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("products")
    .select("id, name, price, promotional_price")
    .eq("id", args.product_id)
    .maybeSingle();
  if (!data) return { found: false };
  return {
    found: true,
    name: data.name,
    price: data.price === null ? null : Number(data.price),
    promotionalPrice: data.promotional_price === null ? null : Number(data.promotional_price),
    priceRegistered: data.price !== null,
  };
}

async function checkProductAvailability(args: { product_id: string }) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("products")
    .select("id, name, available, stock_quantity")
    .eq("id", args.product_id)
    .maybeSingle();
  if (!data) return { found: false };
  return {
    found: true,
    name: data.name,
    available: Boolean(data.available),
    stockQuantity: data.stock_quantity === null ? null : Number(data.stock_quantity),
    stockRegistered: data.stock_quantity !== null,
  };
}

async function getCategories() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("categories").select("slug, name, description").order("name");
  return { categories: data ?? [] };
}

async function searchFaq(args: { query: string; limit?: number }) {
  const supabase = getSupabaseAdmin();
  const limit = clampLimit(args.limit ?? 3);
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

async function getProductMarketplaceLinksTool(args: { product_id: string }) {
  const links = await getMarketplacesForProduct(args.product_id);
  const linked = links.filter((l) => Boolean(l.url));
  if (linked.length === 0) {
    return { found: false, note: "Nenhum canal de compra cadastrado ainda para este produto." };
  }
  return {
    found: true,
    channels: linked.map((l) => ({ name: l.name, url: l.url, specific: l.specific })),
  };
}

// ============================================================
// Tool registry consumed by the API route
// ============================================================

export const chatTools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "search_products",
      description:
        "Busca produtos reais do catálogo da Della por texto livre, categoria e/ou preço máximo. Use sempre que o cliente perguntar sobre produtos, mesmo de forma vaga.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Termo de busca (nome, marca, uso)." },
          category_slug: { type: "string", description: "Slug de categoria, se conhecido (use get_categories)." },
          max_price: { type: "number", description: "Preço máximo desejado pelo cliente, em reais." },
          limit: { type: "number", description: "Quantidade máxima de resultados (padrão 5, máx 10)." },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_product_by_id",
      description: "Busca um produto específico pelo ID interno.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_product_by_slug",
      description: "Busca um produto específico pelo slug.",
      parameters: {
        type: "object",
        properties: { slug: { type: "string" } },
        required: ["slug"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_products_by_category",
      description: "Lista produtos disponíveis de uma categoria específica.",
      parameters: {
        type: "object",
        properties: {
          category_slug: { type: "string" },
          limit: { type: "number" },
        },
        required: ["category_slug"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_product_price",
      description: "Consulta o preço real e o preço promocional (se houver) de um produto pelo ID.",
      parameters: {
        type: "object",
        properties: { product_id: { type: "string" } },
        required: ["product_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_product_availability",
      description: "Consulta disponibilidade/estoque real de um produto pelo ID.",
      parameters: {
        type: "object",
        properties: { product_id: { type: "string" } },
        required: ["product_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_categories",
      description: "Lista todas as categorias de produtos existentes na Della.",
      parameters: { type: "object", properties: {} },
    },
  },
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
      description: "Retorna endereço, contato, horário e redes sociais cadastrados da Della.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_marketplace_links",
      description: "Retorna os links oficiais de marketplace (Mercado Livre, Shopee, TikTok Shop) já cadastrados.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_product_marketplace_links",
      description:
        "Retorna onde comprar um produto específico: usa o link exclusivo daquele produto quando existir, senão o link geral do marketplace. Use sempre que o cliente disser que quer comprar/levar um produto ou pedir o link.",
      parameters: {
        type: "object",
        properties: { product_id: { type: "string" } },
        required: ["product_id"],
      },
    },
  },
];

type ToolArgs = Record<string, unknown>;

const toolHandlers: Record<string, (args: ToolArgs) => Promise<unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  search_products: (args) => searchProducts(args as any),
  get_product_by_id: (args) => getProductById(args as { id: string }),
  get_product_by_slug: (args) => getProductBySlug(args as { slug: string }),
  get_products_by_category: (args) =>
    getProductsByCategory(args as { category_slug: string; limit?: number }),
  get_product_price: (args) => getProductPrice(args as { product_id: string }),
  check_product_availability: (args) => checkProductAvailability(args as { product_id: string }),
  get_categories: () => getCategories(),
  search_faq: (args) => searchFaq(args as { query: string; limit?: number }),
  get_policy: (args) => getPolicy(args as { type: string }),
  get_store_information: () => getStoreInformation(),
  get_marketplace_links: () => getMarketplaceLinks(),
  get_product_marketplace_links: (args) =>
    getProductMarketplaceLinksTool(args as { product_id: string }),
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
