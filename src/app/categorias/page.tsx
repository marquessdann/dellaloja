import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CategoryCard } from "@/components/CategoryCard";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { categories } from "@/data/categories";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

const title = "Categorias";
const description = "Conheça as categorias de produtos da Della Distribuidora.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/categorias" },
  openGraph: buildOpenGraph({ title, description, path: "/categorias" }),
  twitter: buildTwitter({ title, description }),
};

export default function CategoriasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo Della"
        title="Categorias"
        description="Um portfólio organizado por categoria para facilitar a sua navegação. Novas categorias estão a caminho."
      />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <StaggerItem key={category.slug}>
                <CategoryCard category={category} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
