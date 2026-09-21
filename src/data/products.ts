import type { CategorySlug } from "./categories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  highlights: string[];
  image: string;
  images: string[];
  externalUrl: string;
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  /** Overrides the default "Ver no Mercado Livre" label on the product page. */
  buyButtonLabel?: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "body-splash-treta-citrica",
    name: "Treta Cítrica - Body Splash Corporal 120ml (Unissex)",
    brand: "Enaldinho",
    category: "body-splash",
    shortDescription: "Body splash cítrico com brilho perolado e efeito refrescante imediato.",
    description:
      "Um body splash com fragrância Limão e Algodão, direção cítrica combinada a um conceito olfativo limpo e confortável, que deixa o corpo perfumado o dia todo com sensação refrescante logo na primeira borrifada. O líquido é amarelo vibrante e, ao balançar o frasco, sobem partículas na mesma tonalidade, deixando tudo ainda mais brilhante. Ao agitar o frasco antes de usar, ele revela um visual colorido, com pigmento amarelo e brilho perolado na pele, tornando a aplicação ainda mais especial. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais. Agite bem antes de usar e borrife sobre o corpo a cerca de 15 cm de distância — reaplique sempre que quiser. Faz parte da coleção Enaldinho de 4 Sensações: Explosão Cósmica, Chiclete Irado, Gelo Sinistro e Treta Cítrica. Colecione todas.",
    highlights: [
      "Fragrância Limão e Algodão",
      "Direção cítrica e refrescante",
      "Líquido amarelo vibrante",
      "Efeito perolado ao agitar",
      "Vegana",
      "Hipoalergênica",
      "Dermatologicamente testada",
      "Não testada em animais",
      "120ml",
      "Unissex",
    ],
    image: "/images/products/01-treta-citrica-body-splash-enaldinho.webp",
    images: [
      "/images/products/01-treta-citrica-body-splash-enaldinho.webp",
      "/images/products/01-treta-citrica-body-splash-enaldinho-verso.webp",
      "/images/products/01-treta-citrica-body-splash-enaldinho-lab.webp",
      "/images/products/01-treta-citrica-body-splash-enaldinho-limao-1.webp",
      "/images/products/01-treta-citrica-body-splash-enaldinho-limao-2.webp",
    ],
    externalUrl: "#",
    featured: true,
    isBestSeller: true,
    buyButtonLabel: "Veja na Shopee",
  },
  {
    id: "13",
    slug: "body-splash-gelo-sinistro",
    name: "Gelo Sinistro - Body Splash Corporal 120ml (Masculino)",
    brand: "Enaldinho",
    category: "body-splash",
    shortDescription: "Body splash gelado com fragrância Ice Water e brilho perolado azul/verde.",
    description:
      "Um body splash com fragrância Ice Water, de perfil fresco, que deixa o corpo perfumado o dia todo com sensação refrescante e gelada logo na primeira borrifada. O líquido é azul e, ao balançar o frasco, sobem partículas verdes que deixam tudo brilhante. Ao agitar o frasco antes de usar, ele revela um efeito visual azul/verde e brilho perolado na pele, tornando a aplicação ainda mais especial. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais. Agite bem antes de usar e borrife sobre o corpo a cerca de 15 cm de distância — reaplique sempre que quiser. Faz parte da coleção Enaldinho de 4 Sensações: Explosão Cósmica, Chiclete Irado, Gelo Sinistro e Treta Cítrica. Colecione todas.",
    highlights: [
      "Fragrância Ice Water",
      "Perfil fresco e gelado",
      "Líquido azul com partículas verdes",
      "Efeito perolado ao agitar",
      "Vegana",
      "Hipoalergênica",
      "Dermatologicamente testada",
      "Não testada em animais",
      "120ml",
      "Masculino",
    ],
    image: "/images/products/13-gelo-sinistro-body-splash-enaldinho.webp",
    images: [
      "/images/products/13-gelo-sinistro-body-splash-enaldinho.webp",
      "/images/products/13-gelo-sinistro-body-splash-enaldinho-verso.webp",
      "/images/products/13-gelo-sinistro-body-splash-enaldinho-lab.webp",
      "/images/products/13-gelo-sinistro-body-splash-enaldinho-fresca.webp",
      "/images/products/13-gelo-sinistro-body-splash-enaldinho-como-usar.webp",
    ],
    externalUrl: "#",
    buyButtonLabel: "Veja na Shopee",
  },
  {
    id: "14",
    slug: "body-splash-explosao-cosmica",
    name: "Explosão Cósmica - Body Splash Corporal 120ml (unissex)",
    brand: "Enaldinho",
    category: "body-splash",
    shortDescription: "Body splash frutado com tom lilás e partículas brancas brilhantes.",
    description:
      "Um body splash com fragrância Mix de Frutas, de perfil frutado e envolvente, que deixa o corpo perfumado o dia todo com uma sensação refrescante logo na primeira borrifada. O líquido tem um tom lilás e, ao balançar o frasco, sobem partículas brancas brilhantes que parecem uma pequena galáxia. Ao agitar o frasco antes de usar, ele revela um efeito perolado na pele, tornando a aplicação ainda mais especial. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais. Agite bem antes de usar e borrife sobre o corpo a cerca de 15 cm de distância — reaplique sempre que quiser. Faz parte da coleção Enaldinho de 4 Sensações: Explosão Cósmica, Chiclete Irado, Gelo Sinistro e Treta Cítrica. Colecione todas.",
    highlights: [
      "Fragrância Mix de Frutas",
      "Perfil frutado e envolvente",
      "Líquido lilás com partículas brancas",
      "Efeito perolado ao agitar",
      "Vegana",
      "Hipoalergênica",
      "Dermatologicamente testada",
      "Não testada em animais",
      "120ml",
      "Unissex",
    ],
    image: "/images/products/14-explosao-cosmica-body-splash-enaldinho.webp",
    images: [
      "/images/products/14-explosao-cosmica-body-splash-enaldinho.webp",
      "/images/products/14-explosao-cosmica-body-splash-enaldinho-verso.webp",
    ],
    externalUrl: "#",
    buyButtonLabel: "Veja na Shopee",
  },
  {
    id: "15",
    slug: "body-splash-chiclete-irado",
    name: "Chiclete Irado - Body Splash Corporal 120ml (Feminino)",
    brand: "Enaldinho",
    category: "body-splash",
    shortDescription: "Body splash doce de chiclete com cor rosa arroxeada e partículas azuis brilhantes.",
    description:
      "Um body splash com fragrância Chiclete, doce e divertida, inspirada no cheiro característico de chiclete, que deixa o corpo perfumado o dia todo com sensação refrescante logo na primeira borrifada. O líquido tem uma cor rosa arroxeada e, ao balançar o frasco, sobem partículas azuis que deixam tudo ainda mais brilhante. Ao agitar o frasco antes de usar, ele revela um brilho perolado na pele, tornando a aplicação ainda mais especial. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais. Agite bem antes de usar e borrife sobre o corpo a cerca de 15 cm de distância — reaplique sempre que quiser. Faz parte da coleção Enaldinho de 4 Sensações: Explosão Cósmica, Chiclete Irado, Gelo Sinistro e Treta Cítrica. Colecione todas.",
    highlights: [
      "Fragrância de Chiclete",
      "Doce e divertida",
      "Líquido rosa arroxeado com partículas azuis",
      "Efeito perolado ao agitar",
      "Vegana",
      "Hipoalergênica",
      "Dermatologicamente testada",
      "Não testada em animais",
      "120ml",
      "Feminino",
    ],
    image: "/images/products/15-chiclete-irado-body-splash-enaldinho.webp",
    images: [
      "/images/products/15-chiclete-irado-body-splash-enaldinho.webp",
      "/images/products/15-chiclete-irado-body-splash-enaldinho-verso.webp",
      "/images/products/15-chiclete-irado-body-splash-enaldinho-lab.webp",
      "/images/products/15-chiclete-irado-body-splash-enaldinho-destaques.webp",
      "/images/products/15-chiclete-irado-body-splash-enaldinho-como-usar.webp",
    ],
    externalUrl: "#",
    buyButtonLabel: "Veja na Shopee",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug) {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
