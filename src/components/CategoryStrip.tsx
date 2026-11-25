import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

const PROMO_IMAGES = [
  {
    src: "/images/products/48-navalha-aco-inox-edel-solingen-3011548.webp",
    alt: "Navalha Aço Inox Edel Solingen 3011.548",
    width: 450,
    height: 600,
    category: "barbearia",
  },
  {
    src: "/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox-trio-render.webp",
    alt: "Kit 3 Pinças Ponta Fina Edel Solingen Aço Inox",
    width: 1200,
    height: 1200,
    category: "pinca-depilacao",
  },
  {
    src: "/images/products/46-gel-brilho-molhado-letrinhas-235g-amarelo.webp",
    alt: "Gel Brilho Molhado Letrinhas Extra Forte 235g",
    width: 699,
    height: 841,
    category: "letrinhas",
  },
  {
    src: "/images/products/32-cola-cilios-master-elite-diamond-3g-sache.webp",
    alt: "Cola para Extensão de Cílios Master Elite Diamond 3g",
    width: 970,
    height: 970,
    category: "cilios",
  },
  {
    src: "/images/products/20-kit-henna-sobrancelhas-master.webp",
    alt: "Kit Master Henna - Castanho Claro, Médio e Escuro",
    width: 1200,
    height: 1200,
    category: "sobrancelhas",
  },
];

const TRACK = [...PROMO_IMAGES, ...PROMO_IMAGES, ...PROMO_IMAGES];

export function CategoryStrip() {
  return (
    <section className="border-y border-navy-900/8 bg-cream-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="animate-marquee flex w-max gap-6 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
              {[0, 1].map((dup) => (
                <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center gap-6">
                  {TRACK.map((img, i) => (
                    <Link
                      key={`${dup}-${i}`}
                      href={`/produtos?categoria=${img.category}`}
                      tabIndex={dup === 1 ? -1 : undefined}
                      aria-label={img.alt}
                      className="block shrink-0 overflow-hidden rounded-xl border border-navy-900/10 bg-cream-300 transition-colors duration-300 hover:border-gold-500/60"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="h-36 w-auto object-contain p-2 sm:h-44"
                      />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
