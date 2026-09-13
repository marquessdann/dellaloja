import Link from "next/link";
import { categories } from "@/data/categories";
import { Reveal } from "./Reveal";

export function CategoryStrip() {
  return (
    <section className="border-y border-navy-900/8 bg-cream-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] text-navy-500">
              <span className="font-display text-navy-900">
                Um portfólio em expansão —
              </span>{" "}
              hoje com foco em produtos profissionais de beleza e estética,
              amanhã em novas frentes de distribuição.
            </p>
            <div className="no-scrollbar flex gap-6 overflow-x-auto">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/produtos?categoria=${cat.slug}`}
                  className="link-underline shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-700 transition-colors hover:text-gold-600"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
