"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, RotateCw, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { PRODUCTS_MARKER, MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";
import { useSessionId } from "./useSessionId";
import { ProductCardMini } from "./ProductCardMini";
import type { ChatMessage } from "./types";

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "Olá 👋\nSou o assistente da Della.\nPosso te ajudar a encontrar produtos ou tirar dúvidas sobre sua compra. O que você procura?",
};

const QUICK_SUGGESTIONS = [
  { label: "Ver produtos", question: "Quais produtos vocês vendem?" },
  { label: "Extensão de cílios", question: "Vocês têm produtos para extensão de cílios?" },
  { label: "Formas de pagamento", question: "Quais formas de pagamento vocês aceitam?" },
  { label: "Entrega", question: "Vocês entregam? Qual o prazo?" },
  { label: "Trocas", question: "Qual é a política de troca?" },
  { label: "Falar com atendimento", question: "Quero falar com uma pessoa da Della." },
];

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function ChatWidget() {
  const sessionId = useSessionId();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy || !sessionId) return;
    if (trimmed.length > MAX_MESSAGE_LENGTH) return;

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
          "Estou com uma instabilidade agora. Você pode tentar novamente em alguns instantes ou falar diretamente com a Della.";
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
      let raw = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        const markerIdx = raw.indexOf(PRODUCTS_MARKER);
        const visible = markerIdx === -1 ? raw : raw.slice(0, markerIdx);
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: visible, streaming: true } : m))
        );
      }

      const markerIdx = raw.indexOf(PRODUCTS_MARKER);
      const finalText = markerIdx === -1 ? raw : raw.slice(0, markerIdx);
      let products: ChatMessage["products"];
      if (markerIdx !== -1) {
        try {
          products = JSON.parse(raw.slice(markerIdx + PRODUCTS_MARKER.length));
        } catch {
          products = undefined;
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: finalText.trim(), streaming: false, products } : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                role: "error",
                content:
                  "Estou com uma instabilidade agora. Você pode tentar novamente em alguns instantes ou falar diretamente com a Della.",
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

  const showSuggestions = messages.length === 1;

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
                  <p className="text-[11px] text-white/60">Como posso ajudar?</p>
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

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-cream-200 px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed",
                      m.role === "user" && "rounded-br-sm bg-navy-900 text-white",
                      m.role === "assistant" && "rounded-bl-sm border border-navy-900/10 bg-white text-navy-800",
                      m.role === "error" && "rounded-bl-sm border border-gold-600/40 bg-gold-200/50 text-navy-900"
                    )}
                  >
                    {m.content.length > 0 ? (
                      m.content
                    ) : m.streaming ? (
                      <span className="flex gap-1 py-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300" />
                      </span>
                    ) : null}
                  </div>

                  {m.role === "error" && (
                    <div className="mt-1.5 flex items-center gap-2">
                      {m.retryText && (
                        <button
                          type="button"
                          onClick={() => sendMessage(m.retryText!)}
                          className="flex items-center gap-1 rounded-full border border-navy-900/15 px-3 py-1 text-[11px] font-semibold text-navy-700 transition-colors hover:border-navy-900/30"
                        >
                          <RotateCw size={11} /> Tentar de novo
                        </button>
                      )}
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

                  {m.role === "assistant" && m.products && m.products.products.length > 0 && (
                    <div className="mt-2 flex w-full max-w-[90%] flex-col gap-2">
                      {m.products.products.map((p) => (
                        <ProductCardMini key={p.id} product={p} />
                      ))}
                      {m.products.hasMore && (
                        <a
                          href="/produtos"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center text-[12px] font-semibold text-navy-600 underline underline-offset-2 hover:text-navy-900"
                        >
                          Ver mais produtos
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {showSuggestions && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {QUICK_SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => sendMessage(s.question)}
                      className="rounded-full border border-navy-900/15 bg-white px-3 py-1.5 text-[11.5px] font-medium text-navy-700 transition-colors duration-200 hover:border-gold-500/60 hover:text-navy-900"
                    >
                      {s.label}
                    </button>
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
                placeholder={sessionId ? "Digite sua pergunta..." : "Carregando..."}
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
