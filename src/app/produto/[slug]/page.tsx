import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct, getProductsByCategory, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailPanel } from "@/components/ProductDetailPanel";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const path = `/produto/${product.slug}`;
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: path },
    openGraph: buildOpenGraph({
      title: product.name,
      description: product.shortDescription,
      path,
      image: { url: product.image, alt: product.name },
    }),
    twitter: buildTwitter({
      title: product.name,
      description: product.shortDescription,
      image: { url: product.image, alt: product.name },
    }),
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/produto/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);
  // Falls back to the generic store-wide TikTok Shop profile when a product
  // doesn't have its own product-specific TikTok Shop link in marketplaceLinks.
  const hasOwnTiktokLink = product.marketplaceLinks?.some((link) =>
    link.label.toLowerCase().includes("tiktok")
  );
  const tiktokLink = hasOwnTiktokLink
    ? undefined
    : siteConfig.marketplaces.find((m) => m.label === "TikTok Shop")?.href;

  return (
    <>
      <section className="border-b border-navy-900/8 bg-cream-100 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/produtos"
            className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700"
          >
            <ArrowLeft size={15} />
            Voltar ao catálogo
          </Link>

          <ProductDetailPanel product={product} category={category} tiktokLink={tiktokLink} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                Você também pode gostar
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
