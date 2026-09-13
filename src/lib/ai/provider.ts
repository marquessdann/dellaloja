import "server-only";
import Groq from "groq-sdk";
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "groq-sdk/resources/chat/completions";

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
