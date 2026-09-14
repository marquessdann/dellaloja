import { listMarketplaces } from "@/lib/store/queries";
import { isRateLimited, sweepRateLimiter } from "@/lib/ai/security";

export const runtime = "nodejs";

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function GET(req: Request) {
  sweepRateLimiter();
  const ip = getClientIp(req);
  if (isRateLimited(`marketplaces:${ip}`, { limit: 60 })) {
    return Response.json({ error: true, code: "RATE_LIMITED" }, { status: 429 });
  }

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
