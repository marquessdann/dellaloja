import { listCategories } from "@/lib/store/queries";

export const runtime = "nodejs";

export async function GET() {
  try {
    const categories = await listCategories();
    return Response.json({ categories });
  } catch (err) {
    console.error("[store/categories] erro:", err instanceof Error ? err.message : err);
    return Response.json(
      { error: true, code: "DATABASE_ERROR", message: "Não foi possível carregar as categorias agora." },
      { status: 503 }
    );
  }
}
