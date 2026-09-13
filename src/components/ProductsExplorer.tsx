"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PackageSearch } from "lucide-react";
import { products } from "@/data/products";
import { categories, type CategorySlug } from "@/data/categories";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type TabValue = "todos" | CategorySlug;

export function ProductsExplorer({
  initialCategory,
}: {
  initialCategory?: string;
}) {
  const validInitial = categories.some((c) => c.slug === initialCategory)
    ? (initialCategory as CategorySlug)
    : "todos";

  const [activeTab, setActiveTab] = useState<TabValue>(validInitial);
  const [query, setQuery] = useState("");

  const tabs: { value: TabValue; label: string }[] = [
    { value: "todos", label: "Todos" },
    ...categories.map((c) => ({ value: c.slug, label: c.name })),
  ];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeTab === "todos" || p.category === activeTab;
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeTab, query]);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                activeTab === tab.value
                  ? "bg-navy-900 text-cream-100"
                  : "bg-cream-300/70 text-navy-700 hover:bg-cream-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative shrink-0 sm:w-72">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-500"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Buscar produto..."
            className="w-full rounded-full border border-navy-900/12 bg-cream-100 py-2.5 pl-11 pr-4 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400"
          />
        </div>
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.14em] text-navy-500">
        {filtered.length}{" "}
        {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      <div className="mt-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + query}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i, 8) * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-900/15 py-20 text-center">
                <PackageSearch className="text-navy-400" size={32} />
                <p className="mt-4 text-sm text-navy-500">
                  Nenhum produto encontrado para essa busca.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
