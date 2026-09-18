"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

const WORDMARK_SRC = "/images/della-wordmark.webp";
const WORDMARK_W = 1059;
const WORDMARK_H = 200;

const WATERMARK_MASK =
  "radial-gradient(ellipse 82% 82% at 50% 50%, black 45%, rgba(0,0,0,0.55) 72%, transparent 96%)";

type LineConfig = {
  d: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  duration: number;
  delay: number;
  amp: { x: number; y: number; rotate: number };
};

const LINES: LineConfig[] = [
  {
    d: "M620 40 C 500 200, 560 380, 430 560 C 360 660, 380 720, 320 790",
    stroke: "#061A3A",
    strokeWidth: 1.5,
    opacity: 0.18,
    duration: 13,
    delay: 0,
    amp: { x: 6, y: 10, rotate: 0.8 },
  },
  {
    d: "M660 120 C 540 260, 600 420, 470 600 C 410 690, 430 730, 380 800",
    stroke: "#C99A3D",
    strokeWidth: 1.5,
    opacity: 0.35,
    duration: 17,
    delay: 1.2,
    amp: { x: 8, y: 12, rotate: 1 },
  },
  {
    d: "M560 0 C 470 140, 510 320, 400 480 C 340 570, 360 640, 300 720",
    stroke: "#061A3A",
    strokeWidth: 1,
    opacity: 0.12,
    duration: 11,
    delay: 0.6,
    amp: { x: 5, y: 8, rotate: 0.6 },
  },
  {
    d: "M700 260 C 600 340, 640 460, 540 560",
    stroke: "#C99A3D",
    strokeWidth: 1,
    opacity: 0.22,
    duration: 19,
    delay: 2,
    amp: { x: 7, y: 9, rotate: 0.9 },
  },
];

function AbstractLines({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <svg
      viewBox="0 0 700 800"
      fill="none"
      aria-hidden="true"
      className="absolute inset-y-0 right-0 hidden h-full w-[42vw] max-w-[620px] lg:block"
    >
      {LINES.map((line, i) => (
        <motion.path
          key={i}
          d={line.d}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
          strokeLinecap="round"
          opacity={line.opacity}
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, line.amp.x, -line.amp.x * 0.6, line.amp.x * 0.4, 0],
                  y: [0, -line.amp.y, line.amp.y * 0.5, -line.amp.y * 0.3, 0],
                  rotate: [0, line.amp.rotate, -line.amp.rotate * 0.6, line.amp.rotate * 0.3, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: line.duration,
                  delay: line.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
      <circle cx="470" cy="600" r="3" fill="#C99A3D" opacity="0.5" />
      <circle cx="380" cy="800" r="2.5" fill="#061A3A" opacity="0.2" />
      <circle cx="620" cy="40" r="2.5" fill="#C99A3D" opacity="0.4" />
    </svg>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[620px] flex-col overflow-hidden sm:min-h-[680px]"
      style={{
        background:
          "linear-gradient(135deg, #061A3A 0%, #031027 55%, #05070C 100%)",
      }}
    >
      {/* Animated background video — the gradient above stays in place as a
          fallback: it's always painted first, the video just paints over it
          once it can play, and disappears again (via motion-reduce:hidden)
          for prefers-reduced-motion. Decorative only: aria-hidden + no
          controls/focus, so it's never announced or reachable by keyboard. */}
      <video
        aria-hidden="true"
        tabIndex={-1}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      {/* Very small, fixed-color scrim (same navy as the gradient above) so
          the brighter moment in the video loop doesn't wash out the white
          text — barely visible during the rest of the loop, where the video
          is already this dark. Hidden together with the video for
          prefers-reduced-motion, keeping the plain gradient untouched. */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#05070C]/40 motion-reduce:hidden" />

      {/* Giant DELLA wordmark used as an integrated watermark, not a pasted image */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.015, 1], x: [0, 5, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ maskImage: WATERMARK_MASK, WebkitMaskImage: WATERMARK_MASK }}
          className="w-[92%] max-w-[720px] opacity-[0.16] sm:w-[82%] sm:max-w-[900px] sm:opacity-[0.16] lg:w-[70%] lg:max-w-[1150px] lg:opacity-[0.18]"
        >
          <Image
            src={WORDMARK_SRC}
            alt=""
            aria-hidden="true"
            width={WORDMARK_W}
            height={WORDMARK_H}
            priority
            className="h-auto w-full select-none"
          />
        </motion.div>
      </div>

      <AbstractLines prefersReducedMotion={prefersReducedMotion} />

      <div className="relative z-10 flex flex-1 items-center justify-center py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center text-[11px] font-medium uppercase tracking-[0.26em] text-gold-300"
          >
            Distribuidora de Produtos
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6"
          >
            <motion.div
              className="relative mx-auto w-[250px] sm:w-[310px] lg:w-[390px]"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: [1, 1.025, 1],
                      filter: ["brightness(1)", "brightness(1.08)", "brightness(1)"],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Image
                src={WORDMARK_SRC}
                alt="Della"
                width={WORDMARK_W}
                height={WORDMARK_H}
                priority
                className="h-auto w-full select-none"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-5 font-display text-[clamp(2.125rem,4.6vw,3.625rem)] font-semibold leading-[1.15] text-white"
          >
            {siteConfig.heroSlogan.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/60"
          >
            Seu próximo best-seller está aqui.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/produtos"
              className="group flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_18px_36px_-14px_rgba(213,168,75,0.45)]"
            >
              Conheça nossos produtos
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex items-center justify-center gap-8 border-t border-white/10 pb-2 pt-7"
          >
            {["Qualidade", "Confiança", "Resultados"].map((word) => (
              <span
                key={word}
                className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45"
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-t border-navy-900/8 bg-cream-300/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
          {["Cílios & Sobrancelhas", "Pinças", "Equipamentos", "Lifting & Coloração", "Home Care"].map(
            (label) => (
              <span
                key={label}
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy-500/70"
              >
                {label}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
