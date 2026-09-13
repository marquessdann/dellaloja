"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";

export function WhatsappButton() {
  return (
    <motion.a
      href={siteConfig.contact.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Della no WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400 shadow-[0_12px_30px_-8px_rgba(10,21,48,0.55)] sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
    >
      <MessageCircle size={24} className="sm:hidden" />
      <MessageCircle size={26} className="hidden sm:block" />
      <span className="absolute inset-0 -z-10 scale-100 animate-ping rounded-full bg-navy-900/40" />
    </motion.a>
  );
}
