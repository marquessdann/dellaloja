"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Onde a Della está localizada?",
    answer: `A Della está localizada em ${siteConfig.contact.city}, com entregas e atendimento para todo o Brasil.`,
  },
  {
    question: "Como faço para comprar os produtos?",
    answer:
      "Entre em contato pelo WhatsApp ou e-mail para tirar dúvidas e receber mais informações sobre os produtos. Em breve, também será possível comprar diretamente pelo Mercado Livre.",
  },
  {
    question: "Os produtos têm procedência garantida?",
    answer:
      "Sim. Trabalhamos com produtos selecionados, com atenção à qualidade e à aplicação profissional em cada categoria do catálogo.",
  },
  {
    question: "A Della atende apenas Curitiba?",
    answer:
      "Não. Embora nossa base seja em Curitiba, atendemos clientes de todo o Brasil pelos nossos canais de contato.",
  },
  {
    question: "Por que o site não mostra preços?",
    answer:
      "Nesta primeira versão, o site funciona como uma vitrine do catálogo Della. Para consultar valores e condições, fale diretamente com a gente.",
  },
  {
    question: "Quais são os canais de contato disponíveis?",
    answer: `WhatsApp (${siteConfig.contact.whatsapp}), e-mail (${siteConfig.contact.email}) e Instagram (${siteConfig.contact.instagram}).`,
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Perguntas frequentes"
            title="Tire suas dúvidas"
            description="Informações rápidas sobre a Della, o catálogo e como falar com a gente."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-10 divide-y divide-navy-900/10 border-y border-navy-900/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={item.question}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold text-navy-900">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-transform duration-300",
                        isOpen && "rotate-45 border-gold-500 text-gold-600"
                      )}
                    >
                      <Plus size={14} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid overflow-hidden transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                    )}
                  >
                    <p className="min-h-0 text-[14px] leading-relaxed text-navy-500">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
