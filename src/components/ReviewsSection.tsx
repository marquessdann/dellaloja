"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5500;

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const active = reviews[index];

  return (
    <section
      className="relative flex items-center overflow-hidden py-16 sm:min-h-[600px] sm:py-24 lg:min-h-[650px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/hero-visual.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(4,20,48,0.78)]" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-cream-100 sm:text-4xl">
            O que dizem nossos clientes
          </h2>
          <p className="mt-3 text-[15px] text-cream-200/80">
            Experiências de quem já escolheu comprar com a Della.
          </p>
        </motion.div>

        <div className="relative mt-12 flex min-h-[240px] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-2xl border border-white/15 bg-white/[0.08] p-8 text-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-10"
            >
              <div className="flex items-center justify-center gap-1 text-gold-400">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-cream-100 sm:text-base">
                &ldquo;{active.text}&rdquo;
              </p>
              <p className="mt-5 text-sm font-semibold text-cream-200/90">
                {active.name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2.5"
        >
          {reviews.map((r, i) => (
            <button
              key={r.name}
              onClick={() => setIndex(i)}
              aria-label={`Ver avaliação de ${r.name}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-gold-500" : "w-2 bg-white/45 hover:bg-white/70"
              )}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
