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

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <StaggerItem key={item.title}>
              <div className="group relative h-full bg-cream-100 p-8 transition-colors duration-500 hover:bg-navy-950">
                <span className="font-display text-sm italic text-gold-500/70">
                  0{i + 1}
                </span>
                <span className="mt-4 flex h-11 w-11 items-center justify-center border border-navy-900/15 text-navy-900 transition-colors duration-500 group-hover:border-gold-400/50 group-hover:text-gold-400">
                  <item.icon size={18} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold italic text-navy-900 transition-colors duration-500 group-hover:text-cream-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy-500 transition-colors duration-500 group-hover:text-cream-300/70">
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
