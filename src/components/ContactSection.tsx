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
    <section className="bg-navy-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Fale com a gente"
            title="Vamos conversar sobre o seu negócio"
            description="Entre em contato com a Della e conheça mais sobre nosso catálogo de produtos."
            dark
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
                  className="group flex h-full flex-col justify-between rounded-2xl border border-cream-100/10 bg-cream-100/[0.03] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/40 hover:bg-cream-100/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                      <card.icon size={18} />
                    </span>
                    {card.href && (
                      <ArrowUpRight
                        size={16}
                        className="text-cream-300/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-300"
                      />
                    )}
                  </div>
                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-300/50">
                      {card.label}
                    </p>
                    <p className="mt-1 text-base font-medium text-cream-100 break-words">
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
