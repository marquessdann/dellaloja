export type ChatMessageRole = "user" | "assistant" | "error";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  streaming?: boolean;
  retryText?: string;
};

export type MarketplaceChannel = {
  id: string;
  name: string;
  url: string | null;
};

// The deterministic menu's own navigation state — entirely independent of
// the AI conversation. Never touches /api/ai/chat, so it works even if
// Groq is down.
export type MenuView = { kind: "main" } | { kind: "whereToBuy" };
