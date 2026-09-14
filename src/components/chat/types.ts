// Client-safe mirror of src/lib/ai/tools.ts's ProductPayload. Kept separate
// so the chat widget (a "use client" component) never imports anything
// that pulls in the "server-only" Supabase/Groq modules.
export type ChatProductPayload = {
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
  stockQuantity: number | null;
  imageUrl: string | null;
  productUrl: string | null;
  marketplaceUrl: string | null;
};

export type ChatMessageRole = "user" | "assistant" | "error";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  streaming?: boolean;
  products?: { products: ChatProductPayload[]; hasMore: boolean };
  retryText?: string;
};

export type CategorySummary = { slug: string; name: string; description: string | null };

export type MarketplaceChannel = {
  id: string;
  name: string;
  slug: string;
  url: string | null;
  icon: string | null;
};

// The deterministic menu's own navigation state — entirely independent of
// the AI conversation. Never touches /api/ai/chat, so it works even if
// Groq is down.
export type MenuView =
  | { kind: "main" }
  | { kind: "categories" }
  | { kind: "products"; categorySlug?: string; categoryName?: string }
  | { kind: "whereToBuy" }
  | { kind: "productLinks"; product: ChatProductPayload }
  | { kind: "about" };
