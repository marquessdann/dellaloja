export type CategorySlug = "body-splash";

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
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
