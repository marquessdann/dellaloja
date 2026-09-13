"use client";

import { useState } from "react";

const STORAGE_KEY = "della_chat_session_id";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Extremely defensive fallback for older browsers without crypto.randomUUID.
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  );
}

function readOrCreateSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const created = createId();
    window.localStorage.setItem(STORAGE_KEY, created);
    return created;
  } catch {
    // Private browsing / blocked storage: fall back to an in-memory id
    // that just won't survive a refresh.
    return createId();
  }
}

/**
 * Anonymous, per-browser session id used to group a visitor's chat
 * messages in ai_conversations/ai_messages. No personal data — just a
 * random UUID persisted in localStorage. Read/created lazily on first
 * render so it never touches localStorage during SSR; the chat panel
 * itself is closed by default, so this never affects hydrated markup.
 */
export function useSessionId(): string | null {
  const [sessionId] = useState<string | null>(readOrCreateSessionId);
  return sessionId;
}
