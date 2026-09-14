import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { pingModel, getAiModel, logGroqError, runToolDecision } from "@/lib/ai/provider";
import { chatTools, executeTool } from "@/lib/ai/tools";

export const runtime = "nodejs";

/**
 * Supabase errors (PostgrestError, AuthError, etc.) are plain objects, not
 * `Error` instances — `String(err)` on one just gives "[object Object]".
 * Pull out the fields that actually explain what went wrong.
 */
function describeError(err: unknown): { message: string; code?: string; details?: string; hint?: string } {
  if (err instanceof Error) return { message: err.message };
  if (err && typeof err === "object") {
    const e = err as Record<string, unknown>;
    return {
      message: typeof e.message === "string" ? e.message : JSON.stringify(err),
      code: typeof e.code === "string" ? e.code : undefined,
      details: typeof e.details === "string" ? e.details : undefined,
      hint: typeof e.hint === "string" ? e.hint : undefined,
    };
  }
  return { message: String(err) };
}

// Layered diagnostic endpoint — checks the three things that can each
// independently break the chat, and reports each one separately instead
// of collapsing everything into one generic error:
//   1. llm       — can we reach Groq with the configured key/model at all
//   2. database  — can we reach Supabase with the service role key
//   3. tools     — does the model actually call a tool and does it resolve
// Never returns secrets. Safe to leave deployed.
export async function GET() {
  const model = getAiModel();
  const result: Record<string, unknown> = { model };

  // 1. LLM connectivity — no tools, no Supabase involved.
  if (!process.env.GROQ_API_KEY) {
    result.llm = { ok: false, error: "GROQ_API_KEY não está definida neste ambiente." };
  } else {
    try {
      const { content, finishReason } = await pingModel();
      result.llm = {
        ok: true,
        reply: content,
        finishReason,
        note:
          content.trim().length === 0
            ? "A Groq respondeu, mas sem texto visível — normal só se finishReason for 'length' com reasoning pesado; se persistir, é sinal de configuração do modelo."
            : undefined,
      };
    } catch (err) {
      const classified = logGroqError("health.llm", err);
      result.llm = { ok: false, code: classified.code, status: classified.status, message: classified.message };
    }
  }

  // 2. Supabase connectivity — independent of Groq entirely.
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    result.database = {
      ok: false,
      error: "SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não estão definidas neste ambiente.",
    };
  } else {
    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from("store_information").select("id").limit(1);
      if (error) throw error;
      result.database = { ok: true };
    } catch (err) {
      const described = describeError(err);
      result.database = { ok: false, ...described };
      console.error("[ai/health] erro no Supabase:", JSON.stringify(described));
    }
  }

  // 3. Tool calling — only run if both of the above are fine, otherwise
  // it would just fail for the same already-reported reason.
  const llmOk = (result.llm as { ok?: boolean })?.ok;
  const dbOk = (result.database as { ok?: boolean })?.ok;
  if (llmOk && dbOk) {
    try {
      const completion = await runToolDecision({
        messages: [
          { role: "system", content: "Você é um assistente de teste. Use a ferramenta disponível." },
          { role: "user", content: "Qual o endereço da loja?" },
        ],
        tools: chatTools,
        timeoutMs: 10_000,
      });
      const call = completion.choices[0]?.message?.tool_calls?.[0];
      if (!call) {
        result.tools = {
          ok: false,
          note: "O modelo não chamou nenhuma ferramenta para essa pergunta — pode ser o modelo, não a integração.",
        };
      } else {
        const toolResult = await executeTool(call.function.name, call.function.arguments);
        result.tools = { ok: true, calledTool: call.function.name, result: toolResult };
      }
    } catch (err) {
      const classified = logGroqError("health.tools", err);
      result.tools = { ok: false, code: classified.code, status: classified.status, message: classified.message };
    }
  } else {
    result.tools = { ok: false, skipped: true, reason: "llm ou database falharam acima" };
  }

  const allOk = llmOk && dbOk && (result.tools as { ok?: boolean })?.ok;
  return Response.json({ ok: Boolean(allOk), ...result }, { status: allOk ? 200 : 500 });
}
