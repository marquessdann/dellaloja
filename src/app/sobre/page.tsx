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
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">
              Nossa história
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Uma distribuidora pensada para crescer com você
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy-600">
              A Della nasce com o propósito de conectar produtos de qualidade
              a profissionais e empresas que buscam crescer. Nosso compromisso
              é oferecer variedade, confiança e novas oportunidades através de
              uma distribuição moderna e eficiente.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-600">
              Começamos com um catálogo focado em produtos profissionais de
              beleza e estética — cílios, sobrancelhas e cuidados
              relacionados — selecionados com atenção à qualidade e à
              aplicação profissional. É apenas o começo: a estrutura da Della
              foi criada para acompanhar o crescimento do nosso portfólio,
              incluindo futuramente novas categorias e áreas de distribuição.
            </p>
            <p className="mt-6 font-display text-xl italic text-navy-900">
              &ldquo;Produtos certos. Negócios melhores.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-navy-900">
              <Image
                src="/images/products/10-kit-lash-lifting-brow-lamination.webp"
                alt="Produtos Della"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-contain p-14"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Diferenciais />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">
              Posicionamento
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Distribuição pensada para crescer em novas direções
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy-600">
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
