import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Della Distribuidora de Produtos.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Vamos conversar?"
        description="Estamos à disposição para apresentar o catálogo Della e conhecer mais sobre o seu negócio."
      />
      <ContactSection />
    </>
  );
}
