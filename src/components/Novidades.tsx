import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

export function Novidades() {
  const nonFeatured = products.filter((p) => !p.featured).slice(0, 4);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Fique por dentro"
              title="Novidades e outras categorias"
            />
            <Link
              href="/produtos"
              className="link-underline hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-navy-900 sm:flex"
            >
              Ver tudo <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {nonFeatured.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
