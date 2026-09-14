import { listMarketplaces } from "@/lib/store/queries";

export const runtime = "nodejs";

export async function GET() {
  try {
    const marketplaces = await listMarketplaces();
    return Response.json({ marketplaces });
  } catch (err) {
    console.error("[store/marketplaces] erro:", err instanceof Error ? err.message : err);
    return Response.json(
      { error: true, code: "DATABASE_ERROR", message: "Não foi possível carregar os canais de compra agora." },
      { status: 503 }
    );
  }
}
