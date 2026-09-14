import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// ============================================================
// Shared, read-only Supabase queries used by BOTH:
//  - the deterministic menu routes (src/app/api/store/**), which never
//    touch the LLM, so the chat's basic navigation keeps working even if
//    Groq is completely down; and
//  - the AI tool layer (src/lib/ai/tools.ts), for open-ended questions.
// Single source of truth for "what's really in the catalog" either way.
// ============================================================

export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  category: string | null;
  categorySlug: string | null;
  shortDescription: string | null;
  price: number | null;
  promotionalPrice: number | null;
  available: boolean;
  imageUrl: string | null;
  productUrl: string | null;
};

export type MarketplaceSummary = {
  id: string;
  name: string;
  slug: string;
  url: string | null;
  icon: string | null;
};

const PRODUCT_SELECT =
  "id, slug, name, brand, short_description, price, promotional_price, available, image_url, product_url, categories(name, slug)";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProductSummary(row: any): ProductSummary {
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand ?? null,
    category: category?.name ?? null,
    categorySlug: category?.slug ?? null,
    shortDescription: row.short_description ?? null,
    price: row.price === null || row.price === undefined ? null : Number(row.price),
    promotionalPrice:
      row.promotional_price === null || row.promotional_price === undefined
        ? null
        : Number(row.promotional_price),
    available: Boolean(row.available),
    imageUrl: row.image_url ?? null,
    productUrl: row.product_url ?? null,
  };
}

export async function listCategories() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .select("slug, name, description")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function listProducts(opts: {
  categorySlug?: string;
  query?: string;
  maxPrice?: number;
  limit?: number;
} = {}): Promise<{ products: ProductSummary[]; hasMore: boolean }> {
  const supabase = getSupabaseAdmin();
  const limit = Math.min(Math.max(opts.limit ?? 6, 1), 20);

  let categoryId: string | null = null;
  if (opts.categorySlug) {
    const { data } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", opts.categorySlug)
      .maybeSingle();
    if (!data) return { products: [], hasMore: false };
    categoryId = data.id;
  }

  let builder = supabase.from("products").select(PRODUCT_SELECT).eq("available", true);
  if (categoryId) builder = builder.eq("category_id", categoryId);
  if (typeof opts.maxPrice === "number") builder = builder.lte("price", opts.maxPrice);

  if (opts.query && opts.query.trim().length > 0) {
    const q = opts.query.trim();
    const { data: ftsData } = await builder
      .textSearch("search_vector", q, { type: "websearch", config: "portuguese" })
      .limit(limit + 1);
    let rows = ftsData ?? [];
    if (rows.length === 0) {
      let fallback = supabase.from("products").select(PRODUCT_SELECT).eq("available", true);
      if (categoryId) fallback = fallback.eq("category_id", categoryId);
      if (typeof opts.maxPrice === "number") fallback = fallback.lte("price", opts.maxPrice);
      const { data: likeData } = await fallback
        .or(`name.ilike.%${q}%,short_description.ilike.%${q}%,brand.ilike.%${q}%`)
        .limit(limit + 1);
      rows = likeData ?? [];
    }
    return { products: rows.slice(0, limit).map(toProductSummary), hasMore: rows.length > limit };
  }

  const { data, error } = await builder.order("name", { ascending: true }).limit(limit + 1);
  if (error) throw error;
  const rows = data ?? [];
  return { products: rows.slice(0, limit).map(toProductSummary), hasMore: rows.length > limit };
}

export async function getProductById(id: string): Promise<ProductSummary | null> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("products").select(PRODUCT_SELECT).eq("id", id).maybeSingle();
  return data ? toProductSummary(data) : null;
}

export async function getProductBySlug(slug: string): Promise<ProductSummary | null> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("products").select(PRODUCT_SELECT).eq("slug", slug).maybeSingle();
  return data ? toProductSummary(data) : null;
}

/** All active marketplaces, in display order — including ones without a
 * URL yet, so the UI can render a "being set up" state instead of hiding
 * the channel entirely. */
export async function listMarketplaces(): Promise<MarketplaceSummary[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("marketplaces")
    .select("id, name, slug, url, icon")
    .eq("active", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Only marketplaces that already have a real URL — used by the LLM tool
 * so it never mentions a channel it can't actually link to. */
export async function listLinkedMarketplaces(): Promise<MarketplaceSummary[]> {
  const all = await listMarketplaces();
  return all.filter((m) => Boolean(m.url));
}

/**
 * Where a specific product can be bought: product-specific links first
 * (product_marketplace_links), falling back to each marketplace's generic
 * storefront URL when no product-specific link is registered.
 */
export async function getMarketplacesForProduct(
  productId: string
): Promise<(MarketplaceSummary & { specific: boolean })[]> {
  const supabase = getSupabaseAdmin();
  const [{ data: specificLinks }, marketplaces] = await Promise.all([
    supabase
      .from("product_marketplace_links")
      .select("url, marketplace_id, marketplaces(id, name, slug, icon)")
      .eq("product_id", productId)
      .eq("active", true),
    listMarketplaces(),
  ]);

  const specificByMarketplaceId = new Map<string, string>();
  for (const row of specificLinks ?? []) {
    specificByMarketplaceId.set(row.marketplace_id as string, row.url as string);
  }

  return marketplaces.map((m) => {
    const specificUrl = specificByMarketplaceId.get(m.id);
    return {
      ...m,
      url: specificUrl ?? m.url,
      specific: Boolean(specificUrl),
    };
  });
}

export async function getStoreInfo() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("store_information")
    .select(
      "name, address, phone, whatsapp, whatsapp_link, email, business_hours, instagram, instagram_link"
    )
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}
