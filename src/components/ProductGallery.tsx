"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 4000;
const ZOOM_SCALE = 2.2;

// Same frame/thumbnail markup the product page already used for a single
// static image — this just adds automatic rotation through product.images,
// click-to-select thumbnails, and a Mercado-Livre-style hover zoom, without
// touching any surrounding layout.
export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length <= 1 || isZooming) return;
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, images.length, isZooming]);

  // Only real mice/trackpads get the hover zoom — on touch devices the
  // browser can fire a stray mouseenter after a tap, which would otherwise
  // leave the image stuck zoomed in.
  function canHoverZoom() {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  }

  return (
    <div>
      <div className="relative border border-gold-500/40 p-3">
        <span className="absolute -left-2.5 -top-2.5 h-5 w-5 border-l border-t border-gold-500" />
        <span className="absolute -bottom-2.5 -right-2.5 h-5 w-5 border-b border-r border-gold-500" />
        <div
          ref={frameRef}
          onMouseEnter={() => canHoverZoom() && setIsZooming(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZooming(false)}
          className={cn(
            "img-zoom relative aspect-square w-full overflow-hidden bg-cream-300",
            isZooming && "cursor-zoom-in"
          )}
        >
          <Image
            src={images[active]!}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            quality={92}
            className="object-contain p-10 sm:p-14 transition-transform duration-150 ease-out"
            style={{
              transformOrigin: `${origin.x}% ${origin.y}%`,
              transform: isZooming ? `scale(${ZOOM_SCALE})` : "scale(1)",
            }}
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
