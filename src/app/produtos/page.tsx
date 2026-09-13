import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ProductsExplorer } from "@/components/ProductsExplorer";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Navegue pelo catálogo de produtos da Della, organizados por categoria.",
};

export default function ProdutosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo Della"
        title="Nossos Produtos"
        description="Uma vitrine de produtos selecionados para você. Navegue por categoria ou busque pelo que você procura."
      />
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <ProductsExplorer />
          </Suspense>
        </div>
      </section>
    </>
  );
}
