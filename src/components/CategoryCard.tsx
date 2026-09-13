import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/categories";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/produtos?categoria=${category.slug}`}
      className="group relative flex h-80 flex-col justify-end overflow-hidden bg-navy-900"
    >
      <span className="pointer-events-none absolute inset-3 z-10 border border-gold-400/0 transition-all duration-500 group-hover:inset-2.5 group-hover:border-gold-400/50" />

      <div className="img-zoom absolute inset-0">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="object-contain p-10 opacity-90"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent transition-opacity duration-500 group-hover:from-navy-950/95" />

      <div className="relative p-7">
        <h3 className="font-display text-2xl font-semibold italic text-cream-100">
          {category.name}
        </h3>
        <p className="mt-2 max-w-[85%] text-[13px] leading-relaxed text-cream-300/80">
          {category.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
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
