import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-cream-300/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Seleção Della"
              title="Produtos em destaque"
              description="Uma amostra do que você encontra no catálogo completo da Della."
            />
            <Link
              href="/produtos"
              className="link-underline hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-navy-900 sm:flex"
            >
              Ver catálogo completo <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/produtos"
            className="link-underline flex items-center gap-1.5 text-sm font-semibold text-navy-900"
          >
            Ver catálogo completo <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
