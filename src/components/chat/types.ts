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
