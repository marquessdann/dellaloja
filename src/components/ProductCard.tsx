import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/categories";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-cream-100 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-[0_28px_50px_-24px_rgba(10,21,48,0.35)]"
    >
      <div className="img-zoom relative aspect-[4/5] w-full bg-cream-300">
        {product.isNew && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-navy-900 px-3 py-1 text-[10px] font-semibold tracking-wide text-gold-300 uppercase">
            Novidade
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-6"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {category && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-600">
            {category.shortName}
          </span>
        )}
        <h3 className="mt-1.5 font-display text-xl font-semibold text-navy-900">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-navy-500">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-gold-600">
          Ver produto
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
