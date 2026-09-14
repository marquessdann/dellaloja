"use client";

import { Store, ExternalLink, RotateCw } from "lucide-react";
import { useStoreFetch } from "./useStoreFetch";
import type { MarketplaceChannel } from "./types";

function ScreenState({
  loading,
  error,
  onRetry,
  children,
}: {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  children: React.ReactNode;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-[13px] text-navy-400">
        Carregando...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <p className="text-[13px] text-navy-500">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1 rounded-full border border-navy-900/15 px-3 py-1.5 text-[12px] font-semibold text-navy-700 hover:border-navy-900/30"
        >
          <RotateCw size={12} /> Tentar de novo
        </button>
      </div>
    );
  }
  return <>{children}</>;
}

export function MainMenuScreen({ onNavigate }: { onNavigate: (view: "whereToBuy") => void }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate("whereToBuy")}
      className="flex w-full items-center gap-3 rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-left text-[13.5px] font-semibold text-navy-900 transition-colors duration-200 hover:border-gold-500/60 hover:bg-cream-200"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-700">
        <Store size={16} />
      </span>
      Onde comprar?
    </button>
  );
}

function MarketplaceButton({ channel }: { channel: MarketplaceChannel }) {
  if (!channel.url) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-dashed border-navy-900/15 bg-cream-200 px-4 py-3">
        <span className="text-[13.5px] font-semibold text-navy-500">{channel.name}</span>
        <span className="text-[11px] text-navy-400">Em breve</span>
      </div>
    );
  }
  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border border-navy-900/10 bg-white px-4 py-3 transition-colors duration-200 hover:border-gold-500/60 hover:bg-cream-200"
    >
      <span className="text-[13.5px] font-semibold text-navy-900">{channel.name}</span>
      <ExternalLink size={14} className="text-navy-400 group-hover:text-gold-600" />
    </a>
  );
}

export function WhereToBuyScreen() {
  const { state, retry } = useStoreFetch<{ marketplaces: MarketplaceChannel[] }>("/api/store/marketplaces");

  return (
    <ScreenState
      loading={state.status === "loading"}
      error={state.status === "error" ? "Não foi possível carregar os canais de compra agora." : null}
      onRetry={retry}
    >
      <p className="mb-2 text-[13px] text-navy-600">
        Você pode comprar nossos produtos através dos nossos canais oficiais:
      </p>
      <div className="flex flex-col gap-2">
        {state.status === "success" &&
          state.data.marketplaces.map((m) => <MarketplaceButton key={m.id} channel={m} />)}
      </div>
    </ScreenState>
  );
}
