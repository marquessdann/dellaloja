// No "server-only" guard here on purpose: everything in this file is pure
// validation/rate-limiting logic with no secrets, which keeps it testable
// with a plain Node test runner. The actual secrets live behind
// src/lib/supabase/admin.ts and src/lib/ai/provider.ts, which do guard
// themselves with "server-only".
import { MAX_MESSAGE_LENGTH } from "./constants";

export { MAX_MESSAGE_LENGTH };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ValidatedInput = { message: string; sessionId: string };
export type ValidationResult =
  | { ok: true; value: ValidatedInput }
  | { ok: false; error: string };

/**
 * Validates the raw request body. This is the only gate between untrusted
 * network input and the rest of the pipeline — it never tries to detect or
 * block "prompt injection" phrases here (that's a brittle keyword blocklist
 * that just produces false positives on real customer questions). The real
 * defenses against injection are architectural: the user's text only ever
 * enters the conversation as a `user` role message, tools are strictly
 * read-only, and the system prompt explicitly instructs the model to
 * ignore embedded instructions and never reveal itself or secrets.
 */
export function validateChatInput(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Corpo da requisição inválido." };
  }
  const { message, sessionId } = body as Record<string, unknown>;

  if (typeof message !== "string" || message.trim().length === 0) {
    return { ok: false, error: "Mensagem vazia." };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      error: `Mensagem muito longa (máximo ${MAX_MESSAGE_LENGTH} caracteres).`,
    };
  }
  if (typeof sessionId !== "string" || !UUID_RE.test(sessionId)) {
    return { ok: false, error: "Sessão inválida." };
  }

  return { ok: true, value: { message: message.trim(), sessionId } };
}

// ============================================================
// Rate limiting
// ============================================================
// In-memory sliding window, best-effort per warm serverless instance.
// Vercel can spin up multiple instances under load, each with its own
// memory, so this does not guarantee a hard global cap — it protects
// against a single client hammering one instance and against runaway
// loops, which covers the realistic abuse case for a small store's chat.
// If usage grows enough to need a real global limit, swap this for a
// shared store (e.g. Upstash Redis) without touching the API route's
// contract — see docs/ai-agent.md.

const WINDOW_MS = 5 * 60 * 1000;
const DEFAULT_MAX_REQUESTS_PER_WINDOW = 20;

const hits = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  opts: { limit?: number; now?: number } = {}
): boolean {
  const now = opts.now ?? Date.now();
  const limit = opts.limit ?? DEFAULT_MAX_REQUESTS_PER_WINDOW;
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= limit) {
    hits.set(key, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}

// Periodically drop stale keys so the map doesn't grow forever on a
// long-lived warm instance.
let lastSweep = Date.now();
export function sweepRateLimiter(now: number = Date.now()) {
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}

// ============================================================
// Timeout helper
// ============================================================

export class TimeoutError extends Error {
  constructor(message = "Tempo limite excedido.") {
    super(message);
    this.name = "TimeoutError";
  }
}

export async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new TimeoutError()), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}
