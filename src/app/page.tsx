import { Hero } from "@/components/Hero";
import { ExploreCategories } from "@/components/ExploreCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { InstitutionalBanner } from "@/components/InstitutionalBanner";
import { CategoryStrip } from "@/components/CategoryStrip";
import { Novidades } from "@/components/Novidades";
import { AboutPreview } from "@/components/AboutPreview";
import { Diferenciais } from "@/components/Diferenciais";
import { CatalogCta } from "@/components/CatalogCta";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ExploreCategories />
      <FeaturedProducts />
      <InstitutionalBanner />
      <CategoryStrip />
      <Novidades />
      <AboutPreview />
      <Diferenciais />
      <CatalogCta />
      <ContactSection />
    </>
  );
}
