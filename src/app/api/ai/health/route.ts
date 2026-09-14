import { pingModel, getAiModel, logGroqError } from "@/lib/ai/provider";

export const runtime = "nodejs";

// Isolated diagnostic endpoint: only tests "can this server reach Groq with
// the configured key and model", nothing else (no Supabase, no tools, no
// streaming). Hit this first when the chat widget shows an instability
// message — it tells you immediately whether the problem is the LLM
// connection itself or something downstream (Supabase, tools, streaming).
//
// Never returns the API key. Safe to leave deployed; it costs a handful of
// tokens per call and reveals no secrets, only which layer is broken.
export async function GET() {
  const model = getAiModel();
  const hasKey = Boolean(process.env.GROQ_API_KEY);

  if (!hasKey) {
    return Response.json(
      {
        ok: false,
        step: "config",
        model,
        error: "GROQ_API_KEY não está definida neste ambiente (Production/Preview/Development).",
      },
      { status: 500 }
    );
  }

  try {
    const reply = await pingModel();
    return Response.json({ ok: true, step: "llm", model, reply });
  } catch (err) {
    const classified = logGroqError("health", err);
    return Response.json(
      {
        ok: false,
        step: "llm",
        model,
        code: classified.code,
        status: classified.status,
        message: classified.message,
      },
      { status: 500 }
    );
  }
}
