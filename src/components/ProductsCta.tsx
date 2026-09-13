import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/data/site-config";

export function ProductsCta() {
  return (
    <section className="relative overflow-hidden bg-gold-500 py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(10,21,48,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center lg:items-start">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-gold-400">
              <Package size={20} />
            </span>
            <h2 className="mt-5 max-w-lg font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              {siteConfig.ctaSlogan}
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-navy-800/80">
              Produtos selecionados para tornar suas escolhas mais simples,
              práticas e especiais.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/produtos"
            className="group flex items-center gap-2 whitespace-nowrap rounded-full bg-navy-950 px-7 py-4 text-sm font-semibold text-cream-100 transition-all duration-300 hover:bg-navy-900 hover:shadow-[0_16px_32px_-12px_rgba(10,21,48,0.5)]"
          >
            Ver produtos
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
