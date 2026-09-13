"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(213,168,75,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-gold-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cream-400/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:pb-32 lg:pt-20">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-navy-700"
          >
            <span className="h-1 w-1 rotate-45 bg-gold-500" />
            Distribuidora de Produtos
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-7 font-display text-6xl font-semibold leading-[0.98] text-navy-900 sm:text-7xl lg:text-[4.6rem]"
          >
            <span className="font-bold text-navy-900">Della</span>
            <br />
            <span className="font-medium text-[0.6em] leading-tight text-navy-800/90">
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
            className="mt-7 max-w-md text-[15px] leading-relaxed text-navy-500"
          >
            Seu próximo best-seller está aqui.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/produtos"
              className="group flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-sm font-semibold text-cream-100 transition-all duration-300 hover:bg-navy-800 hover:shadow-[0_18px_36px_-14px_rgba(8,16,38,0.4)]"
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
              className="flex items-center gap-2 border border-navy-900/20 px-7 py-3.5 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:border-gold-500"
            >
              <MessageCircle size={16} />
              Fale com a Della
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-16 flex items-center gap-8 border-t border-navy-900/10 pt-7"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative aspect-[4/3] w-full lg:h-[520px] lg:aspect-auto"
        >
          <Image
            src="/images/hero-visual.webp"
            alt="Della"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain"
            style={{
              maskImage:
                "radial-gradient(ellipse 85% 88% at 66% 50%, black 58%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 88% at 66% 50%, black 58%, transparent 100%)",
            }}
            priority
          />
        </motion.div>
      </div>

      <div className="relative border-t border-navy-900/8 bg-cream-300/50">
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
