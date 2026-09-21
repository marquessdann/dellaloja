"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 4000;

// Same frame/thumbnail markup the product page already used for a single
// static image — this just adds automatic rotation through product.images
// plus click-to-select thumbnails, without touching any surrounding layout.
export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, images.length]);

  return (
    <div>
      <div className="relative border border-gold-500/40 p-3">
        <span className="absolute -left-2.5 -top-2.5 h-5 w-5 border-l border-t border-gold-500" />
        <span className="absolute -bottom-2.5 -right-2.5 h-5 w-5 border-b border-r border-gold-500" />
        <div className="img-zoom relative aspect-square w-full overflow-hidden bg-cream-300">
          <Image
            src={images[active]!}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-10 sm:p-14"
            priority={active === 0}
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1} de ${name}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden border bg-cream-300 transition-colors duration-300",
                i === active
                  ? "border-gold-500"
                  : "border-navy-900/10 hover:border-gold-500/50"
              )}
            >
              <Image
                src={img}
                alt={name}
                fill
                sizes="120px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
