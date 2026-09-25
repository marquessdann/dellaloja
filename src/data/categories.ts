export type CategorySlug = "body-splash" | "sobrancelhas" | "cilios" | "pinca-depilacao";

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
  {
    slug: "cilios",
    name: "Cílios",
    shortName: "Cílios",
    description: "Produtos profissionais para aplicação, proteção e cuidado de cílios.",
    image: "/images/products/21-protetor-palpebras-eyepatch-master-flor.webp",
  },
  {
    slug: "pinca-depilacao",
    name: "Pinças & Depilação",
    shortName: "Pinças",
    description: "Pinças profissionais Edel Solingen para design de sobrancelhas e depilação de precisão.",
    image: "/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox.webp",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
