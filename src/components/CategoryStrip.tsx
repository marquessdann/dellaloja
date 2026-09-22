import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

const PROMO_IMAGES = [
  {
    src: "/images/promo/colecao-enaldinho.webp",
    alt: "Coleção Enaldinho - toda a linha de produtos",
    width: 1063,
    height: 1456,
  },
  {
    src: "/images/promo/mutacao-labial-trio.webp",
    alt: "Linha Mutação Labial Enaldinho",
    width: 1696,
    height: 1567,
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
                      href="/produtos?categoria=body-splash"
                      tabIndex={dup === 1 ? -1 : undefined}
                      aria-label="Ver Coleção Enaldinho"
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
