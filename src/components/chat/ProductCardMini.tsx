import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ChatProductPayload } from "./types";

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ProductCardMini({ product }: { product: ChatProductPayload }) {
  const href = product.productUrl ?? `/produto/${product.slug}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-navy-900/10 bg-white p-2.5 transition-colors duration-200 hover:border-gold-500/60"
    >
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-200">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill sizes="56px" className="object-cover" />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-navy-900">{product.name}</span>
        {product.category ? (
          <span className="block text-[11px] uppercase tracking-[0.06em] text-navy-400">{product.category}</span>
        ) : null}
        <span className="mt-0.5 block text-[13px] font-semibold text-navy-900">
          {product.promotionalPrice ? (
            <>
              <span className="mr-1.5 text-navy-400 line-through">{formatPrice(product.price ?? 0)}</span>
              <span className="text-gold-700">{formatPrice(product.promotionalPrice)}</span>
            </>
          ) : product.price !== null ? (
            formatPrice(product.price)
          ) : (
            <span className="text-[12px] font-medium text-navy-400">Consultar preço</span>
          )}
        </span>
      </span>
      <ArrowUpRight
        size={15}
        className="shrink-0 text-navy-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600"
      />
    </a>
  );
}
