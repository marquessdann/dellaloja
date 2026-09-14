import "server-only";
import Groq from "groq-sdk";
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "groq-sdk/resources/chat/completions";

export type ErrorCode =
  | "MISSING_API_KEY"
  | "AUTH"
  | "NOT_FOUND"
  | "RATE_LIMIT"
  | "PROVIDER_ERROR"
  | "TIMEOUT"
  | "NETWORK"
  | "UNKNOWN";

export type ClassifiedError = {
  code: ErrorCode;
  status: number | undefined;
  message: string;
  requestId: string | undefined;
};

/**
 * Turns whatever groq-sdk throws into a small, log-friendly, secret-free
 * shape. Never include the API key or full request/response bodies here —
 * only status/message/requestId, which is enough to tell "wrong key" from
 * "wrong model name" from "rate limited" from "Groq is down" apart.
 */
export function classifyGroqError(err: unknown): ClassifiedError {
  if (err instanceof Groq.APIError) {
    const status = err.status;
    const requestId = err.headers?.get?.("x-request-id") ?? undefined;
    let code: ErrorCode = "UNKNOWN";
    if (status === 401 || status === 403) code = "AUTH";
    else if (status === 404) code = "NOT_FOUND";
    else if (status === 429) code = "RATE_LIMIT";
    else if (status && status >= 500) code = "PROVIDER_ERROR";
    else if (status && status >= 400) code = "PROVIDER_ERROR";
    return { code, status, message: err.message, requestId };
  }
  if (err instanceof Groq.APIConnectionTimeoutError) {
    return { code: "TIMEOUT", status: undefined, message: err.message, requestId: undefined };
  }
  if (err instanceof Groq.APIConnectionError) {
    return { code: "NETWORK", status: undefined, message: err.message, requestId: undefined };
  }
  if (err instanceof Error && err.message.includes("GROQ_API_KEY")) {
    return { code: "MISSING_API_KEY", status: undefined, message: err.message, requestId: undefined };
  }
  return {
    code: "UNKNOWN",
    status: undefined,
    message: err instanceof Error ? err.message : String(err),
    requestId: undefined,
  };
}

/** Structured, secret-free diagnostic log for any AI-provider failure. */
export function logGroqError(context: string, err: unknown) {
  const classified = classifyGroqError(err);
  console.error(
    `[ai/${context}] provider=groq model=${getAiModel()} code=${classified.code} status=${classified.status ?? "n/a"} requestId=${classified.requestId ?? "n/a"} message=${classified.message}`
  );
  return classified;
}

// Single place that knows which LLM provider/model powers the Della
// assistant. Swapping models later (or even providers) means editing only
// this file plus the AI_MODEL env var — nothing in tools.ts, the system
// prompt, or the API route needs to change.

export const DEFAULT_AI_MODEL = "openai/gpt-oss-20b";

export function getAiModel(): string {
  return process.env.AI_MODEL?.trim() || DEFAULT_AI_MODEL;
}

let cachedClient: Groq | null = null;

function getGroqClient(): Groq {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY não configurada. Veja docs/ai-agent.md.");
  }
  cachedClient = new Groq({ apiKey });
  return cachedClient;
}

export type { ChatCompletionMessageParam, ChatCompletionTool };

/**
 * Minimal, isolated test of the Groq connection: no tools, no Supabase, no
 * streaming, no system prompt. Used by /api/ai/health so a failure here
 * can only mean "API key / model / network to Groq" — nothing else in the
 * pipeline is involved yet. See docs/ai-agent.md's layered diagnosis steps.
 */
export async function pingModel(): Promise<string> {
  const groq = getGroqClient();
  const completion = await groq.chat.completions.create(
    {
      model: getAiModel(),
      messages: [{ role: "user", content: "Responda apenas OK." }],
      max_completion_tokens: 10,
      stream: false,
    },
    { timeout: 10_000 }
  );
  return completion.choices[0]?.message?.content ?? "";
}

/**
 * Non-streaming call used for the tool-decision phase: fast, and we need
 * the full tool_calls array before we can execute anything anyway, so
 * streaming this step buys nothing but complexity.
 */
export async function runToolDecision(params: {
  messages: ChatCompletionMessageParam[];
  tools: ChatCompletionTool[];
  timeoutMs?: number;
}) {
  const groq = getGroqClient();
  return groq.chat.completions.create(
    {
      model: getAiModel(),
      messages: params.messages,
      tools: params.tools,
      tool_choice: "auto",
      reasoning_effort: "low",
      temperature: 0.3,
      max_completion_tokens: 700,
      stream: false,
    },
    params.timeoutMs ? { timeout: params.timeoutMs } : undefined
  );
}

/**
 * Streaming call used for the final, user-facing answer once every tool
 * call has already been resolved.
 */
export async function streamFinalAnswer(params: {
  messages: ChatCompletionMessageParam[];
  timeoutMs?: number;
}) {
  const groq = getGroqClient();
  return groq.chat.completions.create(
    {
      model: getAiModel(),
      messages: params.messages,
      reasoning_effort: "low",
      temperature: 0.5,
      max_completion_tokens: 700,
      stream: true,
    },
    params.timeoutMs ? { timeout: params.timeoutMs } : undefined
  );
}
