import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { getProduct, getProductsByCategory, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
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

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ProductGallery images={product.images} name={product.name} />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-2.5">
                {category && (
                  <Link
                    href={`/produtos?categoria=${category.slug}`}
                    className="inline-flex items-center gap-1.5 border border-gold-500/40 bg-gold-200/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-800"
                  >
                    {category.name}
                  </Link>
                )}
                {product.isBestSeller && (
                  <span className="inline-flex items-center gap-1.5 bg-gold-500 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-950">
                    Mais vendido
                  </span>
                )}
              </div>
              <h1 className="mt-5 font-display text-4xl font-bold text-navy-900 sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                {product.brand}
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-navy-600">
                {product.description}
              </p>

              <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-navy-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-navy-900/20 text-navy-900">
                      <Check size={12} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-cream-100 transition-all duration-300 hover:bg-navy-800 hover:shadow-[0_16px_32px_-12px_rgba(10,21,48,0.4)]"
                >
                  <MessageCircle size={16} />
                  Tenho interesse
                </a>
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:border-gold-500"
                >
                  {product.buyButtonLabel ?? "Ver no Mercado Livre"}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              <p className="mt-6 text-xs text-navy-400">
                Produto disponível para consulta. Em breve, compra direta pelo
                Mercado Livre e WhatsApp.
              </p>
            </Reveal>
          </div>
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
