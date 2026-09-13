import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductsExplorer } from "@/components/ProductsExplorer";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Navegue pelo catálogo de produtos da Della, organizados por categoria.",
};

export default async function ProdutosPage({
  searchParams,
}: PageProps<"/produtos">) {
  const params = await searchParams;
  const categoria =
    typeof params.categoria === "string" ? params.categoria : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Catálogo Della"
        title="Nossos Produtos"
        description="Uma vitrine de produtos profissionais selecionados para o seu negócio. Navegue por categoria ou busque pelo que você procura."
      />
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductsExplorer initialCategory={categoria} />
        </div>
      </section>
    </>
  );
}
