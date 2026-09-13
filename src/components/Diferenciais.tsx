import { Sparkles, Layers, Headset, TrendingUp } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const items = [
  {
    icon: Sparkles,
    title: "Produtos Selecionados",
    description:
      "Produtos escolhidos pensando em qualidade e aplicação profissional.",
  },
  {
    icon: Layers,
    title: "Variedade",
    description:
      "Diferentes categorias reunidas em um único catálogo.",
  },
  {
    icon: Headset,
    title: "Atendimento",
    description: "Comunicação direta e próxima.",
  },
  {
    icon: TrendingUp,
    title: "Novas Oportunidades",
    description:
      "Um portfólio preparado para acompanhar a evolução do mercado.",
  },
];

export function Diferenciais() {
  return (
    <section className="bg-cream-300/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Por que a Della"
            title="Diferenciais que fazem a diferença"
            align="center"
            className="max-w-2xl mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group h-full rounded-2xl border border-navy-900/8 bg-cream-100 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-[0_24px_48px_-24px_rgba(10,21,48,0.3)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                  <item.icon size={20} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
