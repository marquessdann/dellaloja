"use client";

import {
  Package,
  LayoutGrid,
  Store,
  Info,
  ExternalLink,
  MapPin,
  Mail,
  Clock,
  AtSign,
  RotateCw,
} from "lucide-react";
import { useStoreFetch } from "./useStoreFetch";
import { ProductCardMini } from "./ProductCardMini";
import type { CategorySummary, ChatProductPayload, MarketplaceChannel } from "./types";

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

function MenuButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-left text-[13.5px] font-semibold text-navy-900 transition-colors duration-200 hover:border-gold-500/60 hover:bg-cream-200"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-700">
        {icon}
      </span>
      {label}
    </button>
  );
}

export function MainMenuScreen({
  onNavigate,
}: {
  onNavigate: (view: "categories" | "products" | "whereToBuy" | "about") => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <MenuButton icon={<Package size={16} />} label="Ver produtos" onClick={() => onNavigate("products")} />
      <MenuButton icon={<LayoutGrid size={16} />} label="Categorias" onClick={() => onNavigate("categories")} />
      <MenuButton icon={<Store size={16} />} label="Onde comprar" onClick={() => onNavigate("whereToBuy")} />
      <MenuButton icon={<Info size={16} />} label="Sobre a Della" onClick={() => onNavigate("about")} />
    </div>
  );
}

export function CategoriesScreen({
  onSelectCategory,
}: {
  onSelectCategory: (slug: string, name: string) => void;
}) {
  const { state, retry } = useStoreFetch<{ categories: CategorySummary[] }>("/api/store/categories");

  return (
    <ScreenState
      loading={state.status === "loading"}
      error={state.status === "error" ? "Não foi possível carregar as categorias agora." : null}
      onRetry={retry}
    >
      <div className="flex flex-col gap-2">
        {state.status === "success" &&
          state.data.categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onSelectCategory(cat.slug, cat.name)}
              className="rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-left transition-colors duration-200 hover:border-gold-500/60 hover:bg-cream-200"
            >
              <span className="block text-[13.5px] font-semibold text-navy-900">{cat.name}</span>
              {cat.description && (
                <span className="mt-0.5 block text-[12px] text-navy-500">{cat.description}</span>
              )}
            </button>
          ))}
      </div>
    </ScreenState>
  );
}

export function ProductsScreen({
  categorySlug,
  categoryName,
  onBuy,
}: {
  categorySlug?: string;
  categoryName?: string;
  onBuy: (product: ChatProductPayload) => void;
}) {
  const url = categorySlug
    ? `/api/store/products?category=${encodeURIComponent(categorySlug)}&limit=6`
    : "/api/store/products?limit=6";
  const { state, retry } = useStoreFetch<{
    products: Omit<ChatProductPayload, "stockQuantity" | "marketplaceUrl">[];
    hasMore: boolean;
  }>(url);

  return (
    <ScreenState
      loading={state.status === "loading"}
      error={state.status === "error" ? "Não foi possível carregar os produtos agora." : null}
      onRetry={retry}
    >
      <div className="flex flex-col gap-2">
        {categoryName && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-400">
            {categoryName}
          </p>
        )}
        {state.status === "success" && state.data.products.length === 0 && (
          <p className="py-4 text-center text-[13px] text-navy-500">
            Nenhum produto encontrado nessa categoria por enquanto.
          </p>
        )}
        {state.status === "success" &&
          state.data.products.map((p) => (
            <div key={p.id} className="flex flex-col gap-1.5">
              <ProductCardMini product={{ ...p, stockQuantity: null, marketplaceUrl: null }} />
              <button
                type="button"
                onClick={() => onBuy({ ...p, stockQuantity: null, marketplaceUrl: null })}
                className="self-end text-[11.5px] font-semibold text-navy-600 underline underline-offset-2 hover:text-navy-900"
              >
                Onde comprar este produto
              </button>
            </div>
          ))}
        {state.status === "success" && state.data.hasMore && (
          <a
            href="/produtos"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-center text-[12px] font-semibold text-navy-600 underline underline-offset-2 hover:text-navy-900"
          >
            Ver todos os produtos
          </a>
        )}
      </div>
    </ScreenState>
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
      <p className="mb-2 text-[13px] text-navy-600">Onde você prefere comprar?</p>
      <div className="flex flex-col gap-2">
        {state.status === "success" &&
          state.data.marketplaces.map((m) => <MarketplaceButton key={m.id} channel={m} />)}
      </div>
    </ScreenState>
  );
}

export function ProductLinksScreen({ product }: { product: ChatProductPayload }) {
  const { state, retry } = useStoreFetch<{ channels: MarketplaceChannel[] }>(
    `/api/store/product-links?productId=${encodeURIComponent(product.id)}`
  );

  return (
    <ScreenState
      loading={state.status === "loading"}
      error={state.status === "error" ? "Não foi possível carregar os canais de compra agora." : null}
      onRetry={retry}
    >
      <p className="mb-2 text-[13px] text-navy-600">
        Você pode comprar <span className="font-semibold text-navy-900">{product.name}</span> em:
      </p>
      <div className="flex flex-col gap-2">
        {state.status === "success" &&
          state.data.channels.map((m) => <MarketplaceButton key={m.id} channel={m} />)}
      </div>
    </ScreenState>
  );
}

type StoreInfo = {
  name: string | null;
  address: string | null;
  whatsapp: string | null;
  whatsapp_link: string | null;
  email: string | null;
  business_hours: string | null;
  instagram: string | null;
  instagram_link: string | null;
};

function AboutDetails({ store }: { store: StoreInfo }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-navy-900/10 bg-white p-4">
      {store.name && <p className="text-[14px] font-semibold text-navy-900">{store.name}</p>}
      {store.address && (
        <p className="flex items-start gap-2 text-[13px] text-navy-600">
          <MapPin size={14} className="mt-0.5 shrink-0 text-navy-400" /> {store.address}
        </p>
      )}
      {store.business_hours && (
        <p className="flex items-start gap-2 text-[13px] text-navy-600">
          <Clock size={14} className="mt-0.5 shrink-0 text-navy-400" /> {store.business_hours}
        </p>
      )}
      {store.email && (
        <a
          href={`mailto:${store.email}`}
          className="flex items-center gap-2 text-[13px] text-navy-600 hover:text-navy-900"
        >
          <Mail size={14} className="text-navy-400" /> {store.email}
        </a>
      )}
      {store.instagram_link && (
        <a
          href={store.instagram_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[13px] text-navy-600 hover:text-navy-900"
        >
          <AtSign size={14} className="text-navy-400" /> {store.instagram}
        </a>
      )}
      {store.whatsapp_link && (
        <a
          href={store.whatsapp_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Falar no WhatsApp
        </a>
      )}
    </div>
  );
}

export function AboutScreen() {
  const { state, retry } = useStoreFetch<{ store: StoreInfo | null }>("/api/store/about");

  return (
    <ScreenState
      loading={state.status === "loading"}
      error={state.status === "error" ? "Não foi possível carregar as informações agora." : null}
      onRetry={retry}
    >
      {state.status === "success" && state.data.store && <AboutDetails store={state.data.store} />}
      {state.status === "success" && !state.data.store && (
        <p className="py-4 text-center text-[13px] text-navy-500">
          Informações da Della ainda não cadastradas.
        </p>
      )}
    </ScreenState>
  );
}
