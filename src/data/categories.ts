export type CategorySlug = "body-splash" | "sobrancelhas";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "body-splash",
    name: "Coleção Enaldinho",
    shortName: "Enaldinho",
    description: "Sprays corporais perfumados, refrescantes e cheios de personalidade.",
    image: "/images/promo/colecao-enaldinho-completa.webp",
  },
  {
    slug: "sobrancelhas",
    name: "Sobrancelhas",
    shortName: "Sobrancelhas",
    description: "Henna e produtos profissionais para design e coloração de sobrancelhas.",
    image: "/images/products/20-henna-sobrancelhas-master-loiro-escuro.webp",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
