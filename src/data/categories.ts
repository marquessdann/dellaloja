export type CategorySlug =
  | "adesivos"
  | "cuidados-preparacao"
  | "extensao-cilios"
  | "pincas"
  | "equipamentos"
  | "lifting-coloracao"
  | "home-care";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "extensao-cilios",
    name: "Extensão de Cílios",
    shortName: "Cílios",
    description: "Fios, tufos e materiais para extensão profissional de cílios.",
    image: "/images/products/04-fios-master-premium-lash.webp",
  },
  {
    slug: "adesivos",
    name: "Adesivos",
    shortName: "Adesivos",
    description: "Colas profissionais de alta fixação para extensão de cílios.",
    image: "/images/products/01-adesivo-master-elite-diamond.webp",
  },
  {
    slug: "pincas",
    name: "Pinças",
    shortName: "Pinças",
    description: "Precisão e firmeza para profissionais exigentes.",
    image: "/images/products/08-pinca-curvada-vermonth.webp",
  },
  {
    slug: "equipamentos",
    name: "Equipamentos",
    shortName: "Equipamentos",
    description: "Tecnologia profissional para elevar cada procedimento.",
    image: "/images/products/09-pinca-pro-luminus-led.webp",
  },
  {
    slug: "lifting-coloracao",
    name: "Lifting & Coloração",
    shortName: "Lifting",
    description: "Lash lifting, brow lamination, henna e tintura profissional.",
    image: "/images/products/10-kit-lash-lifting-brow-lamination.webp",
  },
  {
    slug: "cuidados-preparacao",
    name: "Cuidados & Preparação",
    shortName: "Cuidados",
    description: "Removedores e preparadores para resultados duradouros.",
    image: "/images/products/03-preparador-acqua-primer.webp",
  },
  {
    slug: "home-care",
    name: "Home Care",
    shortName: "Home Care",
    description: "Cuidado diário para prolongar o efeito dos procedimentos.",
    image: "/images/products/12-master-lash-brow-serum.webp",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
