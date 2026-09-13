"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

function AbstractLines() {
  return (
    <svg
      viewBox="0 0 700 800"
      fill="none"
      aria-hidden="true"
      className="absolute inset-y-0 right-0 hidden h-full w-[42vw] max-w-[620px] lg:block"
    >
      <path
        d="M620 40 C 500 200, 560 380, 430 560 C 360 660, 380 720, 320 790"
        stroke="#061A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.18"
      />
      <path
        d="M660 120 C 540 260, 600 420, 470 600 C 410 690, 430 730, 380 800"
        stroke="#C99A3D"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M560 0 C 470 140, 510 320, 400 480 C 340 570, 360 640, 300 720"
        stroke="#061A3A"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.12"
      />
      <path
        d="M700 260 C 600 340, 640 460, 540 560"
        stroke="#C99A3D"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.22"
      />
      <circle cx="470" cy="600" r="3" fill="#C99A3D" opacity="0.5" />
      <circle cx="380" cy="800" r="2.5" fill="#061A3A" opacity="0.2" />
      <circle cx="620" cy="40" r="2.5" fill="#C99A3D" opacity="0.4" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[620px] flex-col overflow-hidden bg-cream-100 sm:min-h-[680px]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(201,154,61,0.06), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(213,168,75,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <AbstractLines />

      <div className="relative z-10 flex flex-1 items-center justify-center py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center text-[11px] font-medium uppercase tracking-[0.26em] text-[#061A3A]"
        >
          Distribuidora de Produtos
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-6 font-display leading-[1.05] text-[#061A3A]"
        >
          <span className="block text-[clamp(2.75rem,7vw,4rem)] font-bold">
            Della
          </span>
          <span className="mt-3 block text-[clamp(2.125rem,4.6vw,3.625rem)] font-semibold leading-[1.15]">
            {siteConfig.heroSlogan.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-navy-500"
        >
          Seu próximo best-seller está aqui.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/produtos"
            className="group flex items-center gap-2 rounded-full bg-[#061A3A] px-7 py-3.5 text-sm font-semibold text-cream-100 transition-all duration-300 hover:bg-navy-800 hover:shadow-[0_18px_36px_-14px_rgba(8,16,38,0.4)]"
          >
            Conheça nossos produtos
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-navy-900/20 bg-white px-7 py-3.5 text-sm font-semibold text-[#061A3A] transition-colors duration-300 hover:border-gold-500"
          >
            <MessageCircle size={16} />
            Fale com a Della
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-14 flex items-center justify-center gap-8 border-t border-navy-900/10 pb-2 pt-7"
        >
          {["Qualidade", "Confiança", "Resultados"].map((word) => (
            <span
              key={word}
              className="text-[10px] font-semibold uppercase tracking-[0.24em] text-navy-400"
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
