"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="grain-overlay relative overflow-hidden bg-navy-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(220,183,104,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-navy-500/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:pb-32 lg:pt-20">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.32em] text-gold-300"
          >
            <span className="h-1 w-1 rotate-45 bg-gold-400" />
            Distribuidora de Produtos
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-7 font-display text-6xl font-semibold leading-[0.98] text-cream-100 sm:text-7xl lg:text-[4.6rem]"
          >
            <span className="text-foil">Della</span>
            <br />
            <span className="italic font-medium text-[0.6em] leading-tight text-cream-200/95">
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
            className="mt-7 max-w-md text-[15px] leading-relaxed text-cream-300/80"
          >
            Produtos selecionados para conectar profissionais e empresas a
            novas oportunidades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/produtos"
              className="group flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_18px_36px_-14px_rgba(201,155,63,0.7)]"
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
              className="flex items-center gap-2 border border-cream-100/25 px-7 py-3.5 text-sm font-semibold text-cream-100 transition-colors duration-300 hover:border-gold-400/70 hover:text-gold-300"
            >
              <MessageCircle size={16} />
              Fale com a Della
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-16 flex items-center gap-8 border-t border-cream-100/10 pt-7"
          >
            {["Qualidade", "Confiança", "Resultados"].map((word) => (
              <span
                key={word}
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-cream-300/50"
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden h-[520px] lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="absolute right-2 top-0 h-[440px] w-[300px] border border-gold-400/40"
          >
            <span className="absolute -left-2.5 -top-2.5 h-5 w-5 border-l border-t border-gold-400" />
            <span className="absolute -bottom-2.5 -right-2.5 h-5 w-5 border-b border-r border-gold-400" />
            <div className="relative h-full w-full overflow-hidden bg-cream-100 p-8">
              <Image
                src="/images/products/10-kit-lash-lifting-brow-lamination.webp"
                alt="Kit Lash Lifting e Brow Lamination Della"
                fill
                sizes="300px"
                className="object-contain p-6"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="absolute -left-2 bottom-6 h-44 w-44 overflow-hidden border border-gold-400/30 bg-navy-900 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/images/products/09-pinca-pro-luminus-led.webp"
              alt="Pinça Pro Luminus LED Della"
              fill
              sizes="176px"
              className="object-contain p-5"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="absolute left-14 top-6 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-gold-400/50 bg-navy-950/80 text-center backdrop-blur-sm"
          >
            <span className="font-display text-lg italic text-gold-300">
              12
            </span>
            <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.18em] text-cream-300/70">
              produtos
            </span>
          </motion.div>

          <span className="absolute right-24 -bottom-4 h-px w-24 bg-gold-400/40" />
        </div>
      </div>

      <div className="relative border-t border-cream-100/10 bg-navy-900/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
          {["Cílios & Sobrancelhas", "Pinças", "Equipamentos", "Lifting & Coloração", "Home Care"].map(
            (label) => (
              <span
                key={label}
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-300/45"
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
