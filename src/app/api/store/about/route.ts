import { getStoreInfo } from "@/lib/store/queries";

export const runtime = "nodejs";

export async function GET() {
  try {
    const store = await getStoreInfo();
    return Response.json({ store });
  } catch (err) {
    console.error("[store/about] erro:", err instanceof Error ? err.message : err);
    return Response.json(
      { error: true, code: "DATABASE_ERROR", message: "Não foi possível carregar as informações da Della agora." },
      { status: 503 }
    );
  }
}
