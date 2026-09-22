import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página que você procura não existe, foi movida ou o endereço está incorreto.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(213,168,75,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/40 bg-gold-200/40 text-navy-900">
          <SearchX size={26} strokeWidth={1.5} />
        </span>

        <span className="ornament-rule mt-7 inline-block text-[13px] font-medium uppercase tracking-[0.12em] text-[#0b2347]">
          Erro 404
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold text-navy-900 sm:text-5xl">
          Ops! Página não encontrada.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-navy-500">
          Essa página pode ter sido removida, ter mudado de endereço, ou o
          link que você seguiu está incorreto. Vamos te ajudar a encontrar o
          que precisa.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-cream-100 transition-all duration-300 hover:bg-navy-800 hover:shadow-[0_16px_32px_-12px_rgba(10,21,48,0.4)]"
          >
            <ArrowLeft size={16} />
            Voltar para o início
          </Link>
          <Link
            href="/produtos"
            className="group flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:border-gold-500"
          >
            Ver catálogo de produtos
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
