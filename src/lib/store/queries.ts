import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// ============================================================
// Shared, read-only Supabase queries used by BOTH:
//  - the deterministic "Onde comprar" menu (src/app/api/store/marketplaces),
//    which never touches the LLM, so it keeps working even if Groq is
//    completely down; and
//  - the AI tool layer (src/lib/ai/tools.ts), for open-ended questions.
// Single source of truth for "which channels are real" either way.
//
// Deliberately selects only columns that exist since the very first
// schema migration (0001_init_schema.sql: id, name, url, active) — it
// does NOT depend on the optional slug/icon/display_order columns added
// later in 0002_marketplace_links.sql. That migration is now optional:
// running it or not, this still works correctly.
// ============================================================

export type MarketplaceSummary = {
  id: string;
  name: string;
  url: string | null;
};

// Fixed, sensible display order for the channels we know about; anything
// else registered later falls back to alphabetical order after these.
const KNOWN_ORDER = ["mercado livre", "shopee", "tiktok shop"];

export async function listMarketplaces(): Promise<MarketplaceSummary[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("marketplaces")
    .select("id, name, url, active")
    .eq("active", true);
  if (error) throw error;

  const rows = (data ?? []) as (MarketplaceSummary & { active: boolean })[];
  return rows
    .sort((a, b) => {
      const ai = KNOWN_ORDER.indexOf(a.name.trim().toLowerCase());
      const bi = KNOWN_ORDER.indexOf(b.name.trim().toLowerCase());
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.name.localeCompare(b.name, "pt-BR");
    })
    .map(({ id, name, url }) => ({ id, name, url }));
}

/** Only marketplaces that already have a real URL — used by the LLM tool
 * so it never mentions a channel it can't actually link to. */
export async function listLinkedMarketplaces(): Promise<MarketplaceSummary[]> {
  const all = await listMarketplaces();
  return all.filter((m) => Boolean(m.url));
}
