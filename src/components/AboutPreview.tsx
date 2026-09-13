import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function AboutPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="relative max-w-md">
            <div className="relative border border-gold-500/50 p-3">
              <span className="absolute -left-2.5 -top-2.5 h-5 w-5 border-l border-t border-gold-500" />
              <span className="absolute -bottom-2.5 -right-2.5 h-5 w-5 border-b border-r border-gold-500" />
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-900">
                <Image
                  src="/images/products/11-henna-master-sobrancelhas.webp"
                  alt="Produtos Della"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain p-14"
                />
              </div>
            </div>
            <div className="absolute -bottom-7 -right-6 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-gold-500/60 bg-cream-100 text-navy-950 shadow-[0_20px_40px_-16px_rgba(8,16,38,0.3)] sm:-right-10">
              <span className="font-display text-xl font-bold leading-none">
                Della
              </span>
              <span className="mt-1.5 text-[8px] font-semibold uppercase tracking-widest text-gold-600">
                Distribuidora
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="ornament-rule max-w-[220px] text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-600">
            Sobre a Della
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Mais que distribuição.
            <br /> Parceria para o seu negócio.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-navy-500">
            A Della nasce com o propósito de conectar produtos de qualidade a
            profissionais e empresas que buscam crescer. Nosso compromisso é
            oferecer variedade, confiança e novas oportunidades através de
            uma distribuição moderna e eficiente.
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
