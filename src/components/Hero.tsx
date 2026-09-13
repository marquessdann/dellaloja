"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(211,179,101,0.9) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-navy-500/30 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-20">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300"
          >
            Distribuidora de Produtos
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-cream-100 sm:text-6xl lg:text-[3.4rem]"
          >
            <span className="text-gold-400">DELLA</span>
            <br />
            {siteConfig.heroSlogan.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-md text-base leading-relaxed text-cream-300/85"
          >
            Produtos selecionados para conectar profissionais e empresas a
            novas oportunidades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/produtos"
              className="group flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_16px_32px_-12px_rgba(195,154,62,0.6)]"
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
              className="flex items-center gap-2 rounded-full border border-cream-100/25 px-6 py-3.5 text-sm font-semibold text-cream-100 transition-colors duration-300 hover:border-gold-400/60 hover:text-gold-300"
            >
              <MessageCircle size={16} />
              Fale com a Della
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex items-center gap-8 border-t border-cream-100/10 pt-6"
          >
            {["Qualidade", "Confiança", "Resultados"].map((word) => (
              <span
                key={word}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-300/60"
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden h-[480px] lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="absolute right-4 top-2 h-[380px] w-[280px] overflow-hidden rounded-[2rem] border border-gold-400/20 bg-cream-100/[0.03] backdrop-blur-sm"
          />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-16 top-8 h-[280px] w-[220px] overflow-hidden rounded-3xl bg-cream-100 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/images/products/10-kit-lash-lifting-brow-lamination.webp"
              alt="Kit Lash Lifting e Brow Lamination Della"
              fill
              sizes="220px"
              className="object-contain p-6"
              priority
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-0 bottom-10 h-[220px] w-[180px] overflow-hidden rounded-3xl bg-cream-100 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/images/products/01-adesivo-master-elite-diamond.webp"
              alt="Adesivo profissional Della"
              fill
              sizes="180px"
              className="object-contain p-6"
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-16 top-0 h-[150px] w-[150px] overflow-hidden rounded-2xl bg-cream-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/images/products/09-pinca-pro-luminus-led.webp"
              alt="Pinça Pro Luminus LED Della"
              fill
              sizes="150px"
              className="object-contain p-4"
            />
          </motion.div>

          <span className="absolute right-40 bottom-4 h-24 w-24 rounded-full border border-gold-400/30" />
        </div>
      </div>

      <svg
        className="block w-full text-cream-200"
        viewBox="0 0 1440 60"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,60 L0,60 Z" />
      </svg>
    </section>
  );
}
