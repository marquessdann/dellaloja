import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Catálogo digital da Della, organizado por categoria de produtos profissionais.",
};

export default function CatalogoPage() {
  const sections = categories
    .map((category) => ({
      category,
      items: getProductsByCategory(category.slug),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Catálogo Digital"
        title="Catálogo Della"
        description="Uma vitrine digital com uma seleção de produtos do nosso portfólio, organizada por categoria. O catálogo completo continua crescendo."
      />

      <section className="border-b border-navy-900/8 bg-cream-100 py-8">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {sections.map((s) => (
            <a
              key={s.category.slug}
              href={`#${s.category.slug}`}
              className="shrink-0 rounded-full border border-navy-900/10 px-4 py-2 text-xs font-semibold text-navy-700 transition-colors hover:border-gold-400 hover:text-gold-600"
            >
              {s.category.name}
            </a>
          ))}
        </div>
      </section>

      {sections.map((s, idx) => (
        <section
          key={s.category.slug}
          id={s.category.slug}
          className={
            idx % 2 === 1
              ? "bg-cream-300/60 py-16 sm:py-20 scroll-mt-24"
              : "py-16 sm:py-20 scroll-mt-24"
          }
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <SectionHeading
                  eyebrow={`Categoria ${idx + 1 < 10 ? "0" : ""}${idx + 1}`}
                  title={s.category.name}
                  description={s.category.description}
                />
                <Link
                  href={`/produtos?categoria=${s.category.slug}`}
                  className="link-underline hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-navy-900 sm:flex"
                >
                  Ver na loja <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>

            <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {s.items.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      ))}
    </>
  );
}
