import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Diferenciais } from "@/components/Diferenciais";
import { CatalogCta } from "@/components/CatalogCta";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sobre a Della",
  description:
    "Conheça a Della Distribuidora de Produtos, seu propósito e seus diferenciais.",
};

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre a Della"
        title="Mais que distribuição. Parceria para o seu negócio."
        description="Conheça o propósito por trás da Della e para onde estamos caminhando."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <span className="ornament-rule max-w-[180px] text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
              Nossa história
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold italic text-navy-900 sm:text-4xl">
              Uma distribuidora pensada para crescer com você
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-navy-600">
              A Della nasce com o propósito de conectar produtos de qualidade
              a profissionais e empresas que buscam crescer. Nosso compromisso
              é oferecer variedade, confiança e novas oportunidades através de
              uma distribuição moderna e eficiente.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
              Começamos com um catálogo focado em produtos profissionais de
              beleza e estética — cílios, sobrancelhas e cuidados
              relacionados — selecionados com atenção à qualidade e à
              aplicação profissional. É apenas o começo: a estrutura da Della
              foi criada para acompanhar o crescimento do nosso portfólio,
              incluindo futuramente novas categorias e áreas de distribuição.
            </p>
            <p className="mt-6 font-display text-xl italic text-gold-600">
              &ldquo;Produtos certos. Negócios melhores.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-md border border-gold-500/50 p-3">
              <span className="absolute -left-2.5 -top-2.5 h-5 w-5 border-l border-t border-gold-500" />
              <span className="absolute -bottom-2.5 -right-2.5 h-5 w-5 border-b border-r border-gold-500" />
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-900">
                <Image
                  src="/images/products/10-kit-lash-lifting-brow-lamination.webp"
                  alt="Produtos Della"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain p-14"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Diferenciais />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="ornament-rule mx-auto max-w-[180px] text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
              Posicionamento
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold italic text-navy-900 sm:text-4xl">
              Distribuição pensada para crescer em novas direções
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-navy-600">
              Hoje, o catálogo da Della reúne produtos profissionais de
              beleza, estética e cuidados relacionados. Mas a Della não se
              limita a um único mercado: nossa estrutura de distribuição foi
              construída para, no futuro, conectar profissionais e empresas a
              produtos de outras áreas — sempre com o mesmo compromisso com
              qualidade e confiança.
            </p>
          </Reveal>
        </div>
      </section>

      <CatalogCta />
    </>
  );
}
