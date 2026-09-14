import { listProducts } from "@/lib/store/queries";

export const runtime = "nodejs";

// Deterministic, non-AI endpoint: the "Ver produtos" / "Categorias" menu
// in the chat widget calls this directly, so it keeps working even when
// Groq is completely down. No LLM involved anywhere in this file.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;

  try {
    const result = await listProducts({
      categorySlug: category,
      limit: Number.isFinite(limit) ? limit : undefined,
    });
    return Response.json(result);
  } catch (err) {
    console.error("[store/products] erro:", err instanceof Error ? err.message : err);
    return Response.json(
      { error: true, code: "DATABASE_ERROR", message: "Não foi possível carregar os produtos agora." },
      { status: 503 }
    );
  }
}
