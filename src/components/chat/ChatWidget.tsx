"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, RotateCw, Phone, ArrowLeft, Home } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";
import { useSessionId } from "./useSessionId";
import { MainMenuScreen, WhereToBuyScreen } from "./MenuScreens";
import { linkifyText } from "./linkify";
import type { ChatMessage, MenuView } from "./types";

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content: "Olá 👋\nSou a Della IA. Posso te ajudar com dúvidas sobre compra, contato e localização. Como posso ajudar?",
};

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const MENU_TITLES: Record<MenuView["kind"], string> = {
  main: "Menu principal",
  whereToBuy: "Onde comprar",
};

export function ChatWidget() {
  const sessionId = useSessionId();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"menu" | "conversation">("menu");
  const [menuView, setMenuView] = useState<MenuView>({ kind: "main" });
  const [menuHistory, setMenuHistory] = useState<MenuView[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, mode, menuView]);

  function goTo(view: MenuView) {
    setMenuHistory((h) => [...h, menuView]);
    setMenuView(view);
    setMode("menu");
  }

  function goBack() {
    setMenuHistory((h) => {
      if (h.length === 0) return h;
      setMenuView(h[h.length - 1]);
      return h.slice(0, -1);
    });
  }

  function goHome() {
    setMenuHistory([]);
    setMenuView({ kind: "main" });
    setMode("menu");
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy || !sessionId) return;
    if (trimmed.length > MAX_MESSAGE_LENGTH) return;

    setMode("conversation");

    const userMessage: ChatMessage = { id: makeId(), role: "user", content: trimmed };
    const assistantId = makeId();
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "", streaming: true },
    ]);
    setInput("");
    setIsBusy(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: trimmed }),
      });

      const contentType = res.headers.get("content-type") ?? "";

      if (!res.ok || contentType.includes("application/json")) {
        const data = await res.json().catch(() => null);
        const friendly =
          data?.message ??
          "Não consegui responder agora. Tente novamente em alguns instantes ou entre em contato com nosso atendimento.";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, role: "error", content: friendly, streaming: false, retryText: trimmed }
              : m
          )
        );
        return;
      }

      if (!res.body) throw new Error("Resposta sem corpo.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: full, streaming: true } : m))
        );
      }

      const finalText = full.trim();
      if (finalText) {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: finalText, streaming: false } : m))
        );
      } else {
        // The connection can be cut mid-stream (e.g. a platform execution
        // limit) before any text arrives — never leave a blank bubble.
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  role: "error",
                  content:
                    "Não consegui responder agora. Tente novamente em alguns instantes ou entre em contato com nosso atendimento.",
                  streaming: false,
                  retryText: trimmed,
                }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                role: "error",
                content:
                  "Não consegui responder agora. Tente novamente em alguns instantes ou entre em contato com nosso atendimento.",
                streaming: false,
                retryText: trimmed,
              }
            : m
        )
      );
    } finally {
      setIsBusy(false);
    }
  }

  const showNavRow = mode === "conversation" || menuView.kind !== "main";
  const canGoBack = mode === "menu" && menuHistory.length > 0;

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? "Fechar assistente da Della" : "Abrir assistente da Della"}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400 shadow-[0_12px_30px_-8px_rgba(10,21,48,0.55)] sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={24} /> : <MessageCircle size={24} className="sm:hidden" />}
            {!open && <MessageCircle size={26} className="hidden sm:block" />}
          </motion.span>
        </AnimatePresence>
        {!open && <span className="absolute inset-0 -z-10 scale-100 animate-ping rounded-full bg-navy-900/40" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-4 z-50 flex h-[min(70vh,600px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-[0_30px_70px_-20px_rgba(4,16,31,0.45)] sm:bottom-28 sm:right-7"
            role="dialog"
            aria-label="Assistente virtual da Della"
          >
            <div className="flex items-center justify-between bg-navy-900 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display text-base font-bold text-navy-950">
                  D
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Della IA</p>
                  <p className="text-[11px] text-white/60">
                    {mode === "menu" ? MENU_TITLES[menuView.kind] : "Como posso ajudar?"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {showNavRow && (
              <div className="flex items-center gap-3 border-b border-navy-900/10 bg-cream-300/60 px-4 py-2">
                {canGoBack && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1 text-[12px] font-semibold text-navy-600 hover:text-navy-900"
                  >
                    <ArrowLeft size={12} /> Voltar
                  </button>
                )}
                <button
                  type="button"
                  onClick={goHome}
                  className="flex items-center gap-1 text-[12px] font-semibold text-navy-600 hover:text-navy-900"
                >
                  <Home size={12} /> Menu principal
                </button>
              </div>
            )}

            <div ref={listRef} className="flex-1 overflow-y-auto bg-cream-200 px-4 py-4">
              {mode === "menu" ? (
                <div className="flex flex-col gap-3">
                  {menuView.kind === "main" && (
                    <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-navy-800">
                      {GREETING.content}
                    </p>
                  )}
                  {menuView.kind === "main" && (
                    <MainMenuScreen onNavigate={(view) => goTo({ kind: view })} />
                  )}
                  {menuView.kind === "whereToBuy" && <WhereToBuyScreen />}
                  {menuView.kind === "main" && (
                    <p className="pt-1 text-center text-[12px] text-navy-400">
                      Ou me pergunte alguma coisa abaixo…
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed",
                          m.role === "user" && "rounded-br-sm bg-navy-900 text-white",
                          m.role === "assistant" &&
                            "rounded-bl-sm border border-navy-900/10 bg-white text-navy-800",
                          m.role === "error" &&
                            "rounded-bl-sm border border-gold-600/40 bg-gold-200/50 text-navy-900"
                        )}
                      >
                        {m.content.length > 0 ? (
                          linkifyText(m.content)
                        ) : m.streaming ? (
                          <span className="flex gap-1 py-1">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300 [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300 [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300" />
                          </span>
                        ) : null}
                      </div>

                      {m.role === "error" && (
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          {m.retryText && (
                            <button
                              type="button"
                              onClick={() => sendMessage(m.retryText!)}
                              className="flex items-center gap-1 rounded-full border border-navy-900/15 px-3 py-1 text-[11px] font-semibold text-navy-700 transition-colors hover:border-navy-900/30"
                            >
                              <RotateCw size={11} /> Tentar de novo
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={goHome}
                            className="flex items-center gap-1 rounded-full border border-navy-900/15 px-3 py-1 text-[11px] font-semibold text-navy-700 transition-colors hover:border-navy-900/30"
                          >
                            <Home size={11} /> Menu principal
                          </button>
                          <a
                            href={siteConfig.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-full bg-navy-900 px-3 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-navy-800"
                          >
                            <Phone size={11} /> Falar com a Della
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-navy-900/10 bg-white px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                placeholder={sessionId ? "Ou me pergunte alguma coisa..." : "Carregando..."}
                disabled={!sessionId}
                className="flex-1 rounded-full border border-navy-900/15 bg-cream-200 px-4 py-2 text-[13.5px] text-navy-900 outline-none placeholder:text-navy-400 focus:border-gold-500 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!sessionId || isBusy || input.trim().length === 0}
                aria-label="Enviar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-400 transition-opacity disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
