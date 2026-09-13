import { categories } from "@/data/categories";
import { CategoryCard } from "./CategoryCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

export function ExploreCategories() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Catálogo Della"
              title="Explore nossas categorias"
              description="Um portfólio organizado para facilitar a descoberta de produtos profissionais."
            />
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <StaggerItem key={category.slug}>
              <CategoryCard category={category} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
