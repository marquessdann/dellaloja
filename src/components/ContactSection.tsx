import { Mail, MessageCircle, AtSign, MapPin, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { siteConfig } from "@/data/site-config";

const cards = [
  {
    icon: Mail,
    label: "E-mail",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp,
    href: siteConfig.contact.whatsappLink,
  },
  {
    icon: AtSign,
    label: "Instagram",
    value: siteConfig.contact.instagram,
    href: siteConfig.contact.instagramLink,
  },
  {
    icon: MapPin,
    label: "Localização",
    value: siteConfig.contact.city,
    href: undefined,
  },
];

export function ContactSection() {
  return (
    <section className="bg-cream-300/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Fale com a gente"
            title="Fale com a Della"
            description="Tire suas dúvidas sobre os produtos e receba atendimento rápido pelos nossos canais de contato."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Wrapper = card.href ? "a" : "div";
            return (
              <StaggerItem key={card.label}>
                <Wrapper
                  {...(card.href
                    ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-full flex-col justify-between border border-navy-900/10 bg-cream-100 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_24px_48px_-28px_rgba(8,16,38,0.25)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-200 text-gold-600">
                      <card.icon size={18} />
                    </span>
                    {card.href && (
                      <ArrowUpRight
                        size={16}
                        className="text-navy-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-600"
                      />
                    )}
                  </div>
                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-navy-400">
                      {card.label}
                    </p>
                    <p className="mt-1 text-base font-medium text-navy-900 break-words">
                      {card.value}
                    </p>
                  </div>
                </Wrapper>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
