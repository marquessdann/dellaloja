import { getMarketplacesForProduct } from "@/lib/store/queries";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (!productId) {
    return Response.json(
      { error: true, code: "INVALID_INPUT", message: "productId é obrigatório." },
      { status: 400 }
    );
  }

  try {
    const channels = await getMarketplacesForProduct(productId);
    return Response.json({ channels });
  } catch (err) {
    console.error("[store/product-links] erro:", err instanceof Error ? err.message : err);
    return Response.json(
      { error: true, code: "DATABASE_ERROR", message: "Não foi possível carregar os canais de compra agora." },
      { status: 503 }
    );
  }
}
