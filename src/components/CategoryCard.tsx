import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/categories";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/produtos?categoria=${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden border border-navy-900/10 bg-cream-100 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-[0_30px_50px_-28px_rgba(8,16,38,0.35)]"
    >
      <span className="pointer-events-none absolute left-0 top-0 z-10 h-6 w-px bg-gold-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute left-0 top-0 z-10 h-px w-6 bg-gold-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="img-zoom relative aspect-[5/4] w-full bg-cream-300">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="object-contain p-10"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl font-semibold text-navy-900">
          {category.name}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-navy-500">
          {category.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-700">
          Explorar
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
