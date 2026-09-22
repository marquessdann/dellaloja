import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Reveal } from "./Reveal";

export function CategoryStrip() {
  return (
    <section className="border-y border-navy-900/8 bg-cream-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[15px] text-navy-500">
            <span className="font-display text-navy-900">
              Um portfólio em expansão —
            </span>{" "}
            hoje com foco em produtos profissionais de beleza e estética,
            amanhã com novas categorias para você descobrir.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="animate-marquee flex w-max gap-5 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
              {[0, 1].map((dup) => (
                <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 gap-5">
                  {products.map((product) => (
                    <Link
                      key={`${dup}-${product.id}`}
                      href="/produtos?categoria=body-splash"
                      tabIndex={dup === 1 ? -1 : undefined}
                      aria-label={`Ver ${product.name} na Coleção Enaldinho`}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-navy-900/10 bg-cream-300 transition-colors duration-300 hover:border-gold-500/60 sm:h-24 sm:w-24"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="96px"
                        className="object-contain p-2.5"
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
