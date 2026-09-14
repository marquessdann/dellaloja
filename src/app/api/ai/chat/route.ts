import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { runToolDecision, streamFinalAnswer, logGroqError } from "@/lib/ai/provider";
import { chatTools, executeTool } from "@/lib/ai/tools";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import {
  isRateLimited,
  sweepRateLimiter,
  validateChatInput,
  withTimeout,
  TimeoutError,
} from "@/lib/ai/security";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

export const runtime = "nodejs";
// Vercel kills a serverless function after 10s by default on some plans —
// this route can legitimately take longer (tool-decision call + streamed
// answer), so extend it explicitly. Well within the 12s+20s worst-case
// internal timeouts below.
export const maxDuration = 60;

const HISTORY_LIMIT = 12;
const MAX_TOOL_ROUNDS = 3;
const TOOL_DECISION_TIMEOUT_MS = 12_000;
const STREAM_TIMEOUT_MS = 20_000;

const FALLBACK_MESSAGE =
  "Não consegui responder agora. Tente novamente em alguns instantes ou entre em contato com nosso atendimento.";

function jsonError(code: string, message: string, status: number) {
  return Response.json({ error: true, code, message }, { status });
}

/**
 * Maps a classified Groq failure to the response we send the browser.
 * The user always gets the same friendly copy; only the `code` differs,
 * so client-side logging/analytics can tell causes apart even though the
 * on-screen message stays simple per the product brief.
 */
function respondToGroqFailure(context: string, err: unknown) {
  const classified = logGroqError(context, err);
  const statusByCode: Record<string, number> = {
    MISSING_API_KEY: 500,
    AUTH: 502,
    NOT_FOUND: 502,
    RATE_LIMIT: 503,
    PROVIDER_ERROR: 503,
    TIMEOUT: 504,
    NETWORK: 503,
    UNKNOWN: 503,
  };
  return jsonError(classified.code, FALLBACK_MESSAGE, statusByCode[classified.code] ?? 503);
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

async function getOrCreateConversation(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  sessionId: string
): Promise<string> {
  const { data: existing } = await supabase
    .from("ai_conversations")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();
  if (existing) return existing.id as string;

  const { data: created, error } = await supabase
    .from("ai_conversations")
    .insert({ session_id: sessionId })
    .select("id")
    .single();
  if (error || !created) throw error ?? new Error("Falha ao criar conversa.");
  return created.id as string;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("INVALID_INPUT", "Corpo da requisição inválido.", 400);
  }

  const validation = validateChatInput(body);
  if (!validation.ok) {
    return jsonError("INVALID_INPUT", validation.error, 400);
  }
  const { message, sessionId } = validation.value;

  sweepRateLimiter();
  const ip = getClientIp(req);
  if (isRateLimited(`session:${sessionId}`, { limit: 20 }) || isRateLimited(`ip:${ip}`, { limit: 60 })) {
    return jsonError(
      "RATE_LIMITED",
      "Você enviou muitas mensagens em pouco tempo. Aguarde um instante e tente novamente.",
      429
    );
  }

  let supabase: ReturnType<typeof getSupabaseAdmin>;
  let conversationId: string;
  try {
    supabase = getSupabaseAdmin();
    conversationId = await getOrCreateConversation(supabase, sessionId);
    const { error: insertError } = await supabase
      .from("ai_messages")
      .insert({ conversation_id: conversationId, role: "user", content: message });
    if (insertError) throw insertError;
  } catch (err) {
    console.error("[ai/chat] erro no Supabase (conversa/mensagem):", err instanceof Error ? err.message : err);
    return jsonError("DATABASE_ERROR", FALLBACK_MESSAGE, 503);
  }

  let historyRows: { role: string; content: string }[] = [];
  try {
    const { data, error } = await supabase
      .from("ai_messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(HISTORY_LIMIT);
    if (error) throw error;
    historyRows = (data ?? []).reverse();
  } catch (err) {
    console.error("[ai/chat] erro ao buscar histórico:", err instanceof Error ? err.message : err);
    // Non-fatal: continue with just the current message.
    historyRows = [{ role: "user", content: message }];
  }

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...historyRows.map(
      (row): ChatCompletionMessageParam =>
        row.role === "assistant"
          ? { role: "assistant", content: row.content }
          : { role: "user", content: row.content }
    ),
  ];

  let hitRoundLimitWithPendingTools = false;

  try {
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const completion = await withTimeout(
        runToolDecision({ messages, tools: chatTools, timeoutMs: TOOL_DECISION_TIMEOUT_MS }),
        TOOL_DECISION_TIMEOUT_MS + 2_000
      );
      const choice = completion.choices[0]?.message;
      const toolCalls = choice?.tool_calls;

      if (!toolCalls || toolCalls.length === 0) {
        break;
      }

      messages.push({
        role: "assistant",
        content: choice.content ?? null,
        tool_calls: toolCalls,
      });

      for (const call of toolCalls) {
        const result = await executeTool(call.function.name, call.function.arguments);

        messages.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(result),
        });
      }

      if (round === MAX_TOOL_ROUNDS - 1) {
        hitRoundLimitWithPendingTools = true;
      }
    }
  } catch (err) {
    if (err instanceof TimeoutError) {
      console.error(`[ai/chat] timeout na etapa de ferramentas (tool-decision), model=${process.env.AI_MODEL ?? "default"}`);
      return jsonError("TIMEOUT", FALLBACK_MESSAGE, 504);
    }
    return respondToGroqFailure("chat.tools", err);
  }

  if (hitRoundLimitWithPendingTools) {
    messages.push({
      role: "system",
      content:
        "Responda agora ao cliente com base apenas nas informações já obtidas acima, mesmo que incompletas.",
    });
  }

  let stream: Awaited<ReturnType<typeof streamFinalAnswer>>;
  try {
    stream = await withTimeout(
      streamFinalAnswer({ messages, timeoutMs: STREAM_TIMEOUT_MS }),
      STREAM_TIMEOUT_MS + 2_000
    );
  } catch (err) {
    if (err instanceof TimeoutError) {
      console.error(`[ai/chat] timeout ao iniciar streaming, model=${process.env.AI_MODEL ?? "default"}`);
      return jsonError("TIMEOUT", FALLBACK_MESSAGE, 504);
    }
    return respondToGroqFailure("chat.stream_start", err);
  }

  const encoder = new TextEncoder();

  const body_ = new ReadableStream<Uint8Array>({
    async start(controller) {
      let full = "";
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices?.[0]?.delta?.content ?? "";
          if (delta) {
            full += delta;
            controller.enqueue(encoder.encode(delta));
          }
        }
      } catch (err) {
        logGroqError("chat.stream_body", err);
        if (!full) {
          controller.enqueue(encoder.encode(FALLBACK_MESSAGE));
          full = FALLBACK_MESSAGE;
        }
      }

      if (!full.trim()) {
        full = FALLBACK_MESSAGE;
        controller.enqueue(encoder.encode(full));
      }

      try {
        await supabase
          .from("ai_messages")
          .insert({ conversation_id: conversationId, role: "assistant", content: full });
      } catch (err) {
        console.error("[ai/chat] erro ao salvar resposta:", err instanceof Error ? err.message : err);
      }

      controller.close();
    },
  });

  return new Response(body_, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
