import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function AboutPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="ornament-rule text-[13px] font-medium uppercase tracking-[0.12em] text-[#0b2347]">
            Sobre a Della
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Encontre o que combina com você.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-navy-500">
            A Della nasce com o propósito de conectar você a produtos de
            qualidade. Nosso compromisso é oferecer variedade, confiança e
            novidades para tornar suas escolhas mais simples e especiais.
          </p>
          <Link
            href="/sobre"
            className="group mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-navy-900"
          >
            <span className="link-underline">Conhecer a Della</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
