import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/ContactSection";
import { Faq } from "@/components/Faq";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

const title = "Contato";
const description = "Fale com a Della Distribuidora de Produtos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contato" },
  openGraph: buildOpenGraph({ title, description, path: "/contato" }),
  twitter: buildTwitter({ title, description }),
};

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Fale com a Della"
        description="Estamos à disposição para apresentar o catálogo Della e tirar todas as suas dúvidas."
      />
      <ContactSection />
      <Faq />
    </>
  );
}
