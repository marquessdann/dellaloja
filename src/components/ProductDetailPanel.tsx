"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";
import { ProductGallery } from "@/components/ProductGallery";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function ProductDetailPanel({
  product,
  category,
  tiktokLink,
}: {
  product: Product;
  category: Category | undefined;
  tiktokLink: string | undefined;
}) {
  // No variant picked yet shows the product's own default image/links —
  // picking one (e.g. a color) swaps both the gallery and the buy buttons.
  const [variantIndex, setVariantIndex] = useState<number | null>(null);
  const activeVariant =
    variantIndex !== null ? product.variants?.[variantIndex] : undefined;

  const images = activeVariant?.images ?? product.images;
  const marketplaceLinks = activeVariant?.marketplaceLinks ?? product.marketplaceLinks;

  return (
    <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        {/* Remounts on variant change (key), so the gallery's own internal
            "active photo" state always starts fresh on the new image set. */}
        <ProductGallery key={variantIndex ?? "default"} images={images} name={product.name} />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flex flex-wrap items-center gap-2.5">
          {category && (
            <Link
              href={`/produtos?categoria=${category.slug}`}
              className="inline-flex items-center gap-1.5 border border-gold-500/40 bg-gold-200/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-800"
            >
              {category.name}
            </Link>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1.5 bg-gold-500 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-950">
              Mais vendido
            </span>
          )}
        </div>
        <h1 className="mt-5 font-display text-4xl font-bold text-navy-900 sm:text-5xl">
          {product.name}
        </h1>
        <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-500">
          {product.brand}
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-navy-600">
          {product.description}
        </p>

        <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2.5 text-sm text-navy-700"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-navy-900/20 text-navy-900">
                <Check size={12} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        {product.variants && product.variants.length > 0 && (
          <div className="mt-7">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
              Escolha a variação
            </span>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.variants.map((variant, i) => (
                <button
                  key={variant.label}
                  type="button"
                  onClick={() => setVariantIndex(i)}
                  aria-pressed={variantIndex === i}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
                    variantIndex === i
                      ? "border-navy-900 bg-navy-900 text-cream-100"
                      : "border-navy-900/15 text-navy-700 hover:border-gold-500"
                  )}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-cream-100 transition-all duration-300 hover:bg-navy-800 hover:shadow-[0_16px_32px_-12px_rgba(10,21,48,0.4)]"
          >
            <MessageCircle size={16} />
            Tenho interesse
          </a>
          {marketplaceLinks && marketplaceLinks.length > 0 ? (
            <>
              {marketplaceLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:border-gold-500"
                >
                  {link.label}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
              {tiktokLink && (
                <a
                  href={tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:border-gold-500"
                >
                  Ver no TikTok Shop
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </>
          ) : (
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:border-gold-500"
            >
              {product.buyButtonLabel ?? "Ver no Mercado Livre"}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>

        <p className="mt-6 text-xs text-navy-400">
          {marketplaceLinks && marketplaceLinks.length > 0
            ? "Produto disponível para compra direta pelo Mercado Livre, Shopee e TikTok Shop, ou consulta pelo WhatsApp."
            : "Produto disponível para consulta. Em breve, compra direta pelo Mercado Livre e WhatsApp."}
        </p>
      </Reveal>
    </div>
  );
}
