import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Diferenciais } from "@/components/Diferenciais";
import { ProductsCta } from "@/components/ProductsCta";
import { Reveal } from "@/components/Reveal";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

const title = "Sobre a Della";
const description =
  "Conheça a Della Distribuidora de Produtos, seu propósito e seus diferenciais.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sobre" },
  openGraph: buildOpenGraph({ title, description, path: "/sobre" }),
  twitter: buildTwitter({ title, description }),
};

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre a Della"
        title="Uma vitrine de produtos profissionais"
        description="Conheça o propósito por trás da Della e o que você encontra em nosso catálogo."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="ornament-rule text-[13px] font-medium uppercase tracking-[0.12em] text-[#0b2347]">
              Nossa história
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Uma loja pensada para o consumidor moderno
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-navy-600">
              A Della nasce com o propósito de conectar você a produtos de
              qualidade. Nosso compromisso é oferecer variedade, confiança e
              novidades para tornar suas escolhas mais simples e especiais.
            </p>
            <p className="mt-6 font-display text-xl text-navy-900">
              &ldquo;Variedade para todos os momentos.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <Diferenciais />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="ornament-rule text-[13px] font-medium uppercase tracking-[0.12em] text-[#0b2347]">
              Posicionamento
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Sempre com novidades pensadas para você
            </h2>
          </Reveal>
        </div>
      </section>

      <ProductsCta />
    </>
  );
}
