"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PackageSearch } from "lucide-react";
import { products } from "@/data/products";
import { categories, type CategorySlug } from "@/data/categories";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type TabValue = "todos" | CategorySlug;

export function ProductsExplorer() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") ?? undefined;
  const validInitial = categories.some((c) => c.slug === initialCategory)
    ? (initialCategory as CategorySlug)
    : "todos";
  const initialQuery = searchParams.get("busca") ?? "";

  const [activeTab, setActiveTab] = useState<TabValue>(validInitial);
  const [query, setQuery] = useState(initialQuery);

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
      <div className="flex flex-col gap-6 border-b border-navy-900/10 pb-1 sm:flex-row sm:items-end sm:justify-between">
        <div className="no-scrollbar flex gap-7 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "relative shrink-0 whitespace-nowrap pb-3 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300",
                activeTab === tab.value
                  ? "text-navy-900"
                  : "text-navy-400 hover:text-navy-700"
              )}
            >
              {tab.label}
              {activeTab === tab.value && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-gold-500"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative shrink-0 pb-3 sm:w-72">
          <Search
            size={15}
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-navy-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Buscar produto..."
            className="w-full border-b border-navy-900/15 bg-transparent py-1 pl-6 pr-2 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-400 focus:border-gold-500"
          />
        </div>
      </div>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-400">
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
              <div className="flex flex-col items-center justify-center border border-dashed border-navy-900/15 py-20 text-center">
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
