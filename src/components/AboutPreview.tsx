import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function AboutPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] bg-navy-900">
              <Image
                src="/images/products/11-henna-master-sobrancelhas.webp"
                alt="Produtos Della"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-contain p-14"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-[0_20px_40px_-16px_rgba(195,154,62,0.7)] sm:-right-8">
              <span className="font-display text-2xl font-bold leading-none">
                Della
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest">
                Distribuidora
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">
            Sobre a Della
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Mais que distribuição.
            <br /> Parceria para o seu negócio.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-500">
            A Della nasce com o propósito de conectar produtos de qualidade a
            profissionais e empresas que buscam crescer. Nosso compromisso é
            oferecer variedade, confiança e novas oportunidades através de
            uma distribuição moderna e eficiente.
          </p>
          <Link
            href="/sobre"
            className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900"
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
