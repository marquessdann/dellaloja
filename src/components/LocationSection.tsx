import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";

const ADDRESS = "Rua Salim Tacla, 474, Cajuru, Curitiba - PR";
const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS
)}`;
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

export function LocationSection() {
  return (
    <section className="bg-cream-200 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="ornament-rule text-[13px] font-medium uppercase tracking-[0.12em] text-[#0b2347]">
              Localização
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Venha conhecer a Della
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
              Rua Salim Tacla, 474
              <br />
              Cajuru, Curitiba - PR
            </p>
            <a
              href={MAPS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-sm font-semibold text-cream-100 transition-all duration-300 hover:bg-navy-800"
            >
              <MapPin size={16} />
              Ver no Google Maps
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-[20px] border border-navy-900/10 shadow-[0_30px_60px_-30px_rgba(8,16,38,0.25)]">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Della no Google Maps"
              className="h-[300px] w-full sm:h-[380px] lg:h-[440px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
