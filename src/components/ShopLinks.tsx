import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { siteConfig } from "@/data/site-config";

// Brand-matched button color per marketplace — amarelo Mercado Livre, laranja
// Shopee, preto TikTok — falls back to navy for any store added later.
const STORE_STYLES: Record<string, string> = {
  "Mercado Livre": "bg-[#FFE600] text-navy-950 hover:bg-[#FFD400]",
  Shopee: "bg-[#EE4D2D] text-cream-100 hover:bg-[#D8431F]",
  "TikTok Shop": "bg-navy-950 text-cream-100 hover:bg-black",
};

export function ShopLinks() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Disponível em"
            title="Compre em nossas lojas"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {siteConfig.marketplaces.map((store) => (
            <StaggerItem key={store.label}>
              <a
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold shadow-[0_8px_24px_-10px_rgba(4,16,31,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(4,16,31,0.35)] ${
                  STORE_STYLES[store.label] ?? "bg-navy-900 text-cream-100 hover:bg-navy-800"
                }`}
              >
                {store.label}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
