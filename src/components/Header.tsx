"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/data/site-config";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const renderNavItem = (item: (typeof siteConfig.nav)[number]) =>
    item.label === "Categorias" ? (
      <div
        key={item.href}
        className="relative"
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <button
          className="link-underline flex items-center gap-1 text-sm font-medium text-cream-100 py-2"
          aria-expanded={megaOpen}
        >
          {item.label}
          <ChevronDown
            size={14}
            className={cn(
              "transition-transform duration-300",
              megaOpen && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-full z-50 mt-2 w-[720px] -translate-x-1/2 border border-navy-900/10 bg-cream-100 p-6 shadow-[0_24px_60px_-20px_rgba(10,21,48,0.35)]"
            >
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/produtos?categoria=${cat.slug}`}
                    className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-navy-900/[0.04]"
                  >
                    <span className="img-zoom relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-300">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1.5"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-snug text-navy-900 group-hover:text-navy-700">
                        {cat.name}
                      </span>
                      <span className="block truncate text-xs text-navy-500">
                        {cat.shortName}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-navy-900/10 pt-4">
                <p className="text-xs text-navy-500">
                  Novas categorias em breve, à medida que o portfólio Della cresce.
                </p>
                <Link
                  href="/categorias"
                  className="link-underline flex items-center gap-1 text-xs font-semibold text-navy-700"
                >
                  Ver todas <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ) : (
      <Link
        key={item.href}
        href={item.href}
        className="link-underline text-sm font-medium text-cream-100 py-2"
      >
        {item.label}
      </Link>
    );

  const leftNav = siteConfig.nav.slice(0, 3);
  const rightNav = siteConfig.nav.slice(3);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-navy-900 transition-shadow duration-300",
        scrolled && "shadow-[0_4px_24px_-8px_rgba(4,16,31,0.5)]"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
        <nav className="hidden flex-1 items-center justify-end gap-7 lg:flex">
          {leftNav.map(renderNavItem)}
        </nav>

        <div className="hidden w-32 shrink-0 lg:block" />

        <div className="hidden flex-1 items-center gap-7 lg:flex">
          <nav className="flex items-center gap-7">
            {rightNav.map(renderNavItem)}
          </nav>
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_8px_24px_-8px_rgba(213,168,75,0.6)]"
          >
            Fale com a Della
          </a>
        </div>

        <button
          className="ml-auto flex h-10 w-10 items-center justify-center text-cream-100 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={26} />
        </button>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo dark iconOnly className="pointer-events-auto" />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-cream-100 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  className="flex h-10 w-10 items-center justify-center text-navy-900"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {siteConfig.nav.map((item, i) =>
                  item.label === "Categorias" ? (
                    <div key={item.href}>
                      <button
                        onClick={() => setMobileCategoriesOpen((v) => !v)}
                        className="flex w-full items-center justify-between border-b border-navy-900/10 py-4 text-base font-medium text-navy-900"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform",
                            mobileCategoriesOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileCategoriesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 py-2 pl-2">
                              {categories.map((cat) => (
                                <Link
                                  key={cat.slug}
                                  href={`/produtos?categoria=${cat.slug}`}
                                  onClick={closeMobile}
                                  className="py-2 text-sm text-navy-700"
                                >
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="block border-b border-navy-900/10 py-4 text-base font-medium text-navy-900"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 rounded-full bg-navy-900 px-5 py-3 text-center text-sm font-semibold text-cream-100"
              >
                Fale com a Della
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
