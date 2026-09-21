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
    id: "2",
    slug: "removedor-excellent-olive-balm",
    name: "Excellent Olive Remover Balm",
    brand: "Excellent",
    category: "cuidados-preparacao",
    shortDescription: "Removedor em balm com óleo de oliva para remoção segura.",
    description:
      "Removedor de extensão de cílios em formato balm, enriquecido com óleo de oliva para nutrir os fios naturais durante a remoção completa do adesivo. Textura em bisnaga facilita a aplicação e o controle do produto.",
    highlights: [
      "Fórmula com óleo de oliva",
      "Remoção sem ardência",
      "Ação entre 7 e 10 minutos",
      "Nutre os cílios naturais",
    ],
    image: "/images/products/02-removedor-excellent-olive-balm.webp",
    images: ["/images/products/02-removedor-excellent-olive-balm.webp"],
    externalUrl: "#",
  },
  {
    id: "3",
    slug: "preparador-acqua-primer",
    name: "Acqua Primer",
    brand: "Master",
    category: "cuidados-preparacao",
    shortDescription: "Primer aquoso que prepara os fios naturais para a extensão.",
    description:
      "Primer profissional para extensão de cílios, formulado sem álcool e enriquecido com niacinamida e D-pantenol. Remove a oleosidade dos fios naturais e potencializa a aderência do adesivo, indicado também para lash lifting e brow lamination.",
    highlights: [
      "Fórmula suave sem álcool",
      "Com niacinamida e D-pantenol",
      "Aumenta a retenção da extensão",
      "Ideal para fios sensíveis",
    ],
    image: "/images/products/03-preparador-acqua-primer.webp",
    images: ["/images/products/03-preparador-acqua-primer.webp"],
    externalUrl: "#",
  },
  {
    id: "4",
    slug: "fios-master-premium-lash",
    name: "Master Premium Lash",
    brand: "Master",
    category: "extensao-cilios",
    shortDescription: "Fios versáteis para extensão de cílios em diferentes técnicas.",
    description:
      "Fios para extensão de cílios com versatilidade, elegância e naturalidade. Projetados para realçar o olhar de forma sofisticada e personalizada, com conforto e durabilidade em diferentes técnicas de aplicação.",
    highlights: [
      "Não desmancham",
      "Não perdem a curvatura",
      "Diversas curvaturas e espessuras",
      "Uso profissional",
    ],
    image: "/images/products/04-fios-master-premium-lash.webp",
    images: ["/images/products/04-fios-master-premium-lash.webp"],
    externalUrl: "#",
    featured: true,
  },
  {
    id: "5",
    slug: "fios-technology-lash-w5d",
    name: "Master Technology Lash W5D",
    brand: "Master",
    category: "extensao-cilios",
    shortDescription: "Fios em formato W para volume e definição imediata.",
    description:
      "Fios com tecnologia W que criam um efeito volumoso e dramático com uma única aplicação. O formato exclusivo permite mais preenchimento com menos peso sobre os cílios naturais, indicado para quem busca praticidade sem abrir mão da leveza.",
    highlights: [
      "Formato W exclusivo",
      "Volume com aplicação precisa",
      "Leveza e conforto",
      "Disponível em preto e marrom",
    ],
    image: "/images/products/05-fios-technology-lash-w5d.webp",
    images: ["/images/products/05-fios-technology-lash-w5d.webp"],
    externalUrl: "#",
  },
  {
    id: "6",
    slug: "tufos-cilios",
    name: "Tufos para Cílios",
    brand: "Master",
    category: "extensao-cilios",
    shortDescription: "Tufos em tamanhos únicos e mix para efeitos naturais.",
    description:
      "Tufos de cílios em tamanhos P, M e G, disponíveis também em mix, com e sem caixa. Uma opção prática para procedimentos rápidos e para compor looks naturais com efeito volumoso pontual.",
    highlights: [
      "Tamanhos P, M, G e mix",
      "Aplicação prática",
      "Efeito natural",
      "Ideal para manutenções rápidas",
    ],
    image: "/images/products/06-tufos-cilios.webp",
    images: ["/images/products/06-tufos-cilios.webp"],
    externalUrl: "#",
  },
  {
    id: "7",
    slug: "pinca-4md-pro-diamantada",
    name: "Pinça 4MD-PRO Diamantada",
    brand: "Master",
    category: "pincas",
    shortDescription: "Pinça diamantada para montagem de fan e acoplagem.",
    description:
      "Pinça profissional com tecnologia diamantada, desenvolvida para a montagem de fans e acoplagem dos fios com máxima precisão. Produzida em aço, é leve, resistente à autoclave e pensada para uso intenso em estúdio.",
    highlights: [
      "Tecnologia diamantada",
      "Resistente à autoclave",
      "Alta precisão para fans",
      "Produzida em aço",
    ],
    image: "/images/products/07-pinca-4md-pro-diamantada.webp",
    images: ["/images/products/07-pinca-4md-pro-diamantada.webp"],
    externalUrl: "#",
    featured: true,
  },
  {
    id: "8",
    slug: "pinca-curvada-vermonth",
    name: "Pinça Ponta Curvada",
    brand: "Vermonth",
    category: "pincas",
    shortDescription: "Pinça curvada para montagem de fans e acoplagem dos fios.",
    description:
      "Pinça de ponta curvada com 11,5 cm, indicada para procedimentos de extensão de cílios. Ideal para a montagem de fans e a acoplagem dos fios, proporcionando alta precisão, firmeza e controle durante o manuseio.",
    highlights: [
      "11,5 cm de comprimento",
      "Ideal para montagem de fans",
      "Alta precisão e firmeza",
      "Aço inoxidável",
    ],
    image: "/images/products/08-pinca-curvada-vermonth.webp",
    images: ["/images/products/08-pinca-curvada-vermonth.webp"],
    externalUrl: "#",
  },
  {
    id: "9",
    slug: "pinca-pro-luminus-led",
    name: "Pinça Pro Luminus LED",
    brand: "Master",
    category: "equipamentos",
    shortDescription: "Pinça de isolamento com luz de LED integrada.",
    description:
      "Pinça de isolamento com fonte de luz LED integrada e carregamento USB-C, desenvolvida para dar mais clareza e precisão durante o isolamento dos fios. Design leve e ergonômico para uso contínuo, com autonomia de bateria de até 16 horas.",
    highlights: [
      "Fonte de luz LED integrada",
      "Carregamento USB-C",
      "Até 16 horas de autonomia",
      "Design leve e ergonômico",
    ],
    image: "/images/products/09-pinca-pro-luminus-led.webp",
    images: ["/images/products/09-pinca-pro-luminus-led.webp"],
    externalUrl: "#",
    featured: true,
    isNew: true,
  },
  {
    id: "10",
    slug: "kit-lash-lifting-brow-lamination",
    name: "Kit Lash Lifting e Brow Lamination",
    brand: "Master",
    category: "lifting-coloracao",
    shortDescription: "Kit completo para lash lifting e brow lamination.",
    description:
      "Kit com três produtos para realizar lash lifting e brow lamination em um único procedimento. Fórmula enriquecida com colágeno, queratina, D-pantenol, óleo de argan e rícino, rendendo até 60 aplicações de lash lifting e 40 de brow lamination.",
    highlights: [
      "3 produtos em 1 kit",
      "Rende até 60 aplicações",
      "Colágeno, queratina e D-pantenol",
      "Uso profissional",
    ],
    image: "/images/products/10-kit-lash-lifting-brow-lamination.webp",
    images: ["/images/products/10-kit-lash-lifting-brow-lamination.webp"],
    externalUrl: "#",
    featured: true,
  },
  {
    id: "11",
    slug: "henna-master-sobrancelhas",
    name: "Henna Master para Sobrancelhas",
    brand: "Master",
    category: "lifting-coloracao",
    shortDescription: "Henna profissional com extrato de jaborandi e bamboo.",
    description:
      "Henna profissional para sobrancelhas, formulada com extrato de jaborandi e bamboo para realçar e fortalecer os fios. Acompanha fixador, recipiente para mistura, espátula e par de luvas, disponível em diferentes tons.",
    highlights: [
      "Kit completo de aplicação",
      "Dermatologicamente aprovado",
      "Livre de chumbo e PPD",
      "Vegano e cruelty free",
    ],
    image: "/images/products/11-henna-master-sobrancelhas.webp",
    images: ["/images/products/11-henna-master-sobrancelhas.webp"],
    externalUrl: "#",
  },
  {
    id: "12",
    slug: "master-lash-brow-serum",
    name: "Master Lash & Brow Serum",
    brand: "Master",
    category: "home-care",
    shortDescription: "Sérum 4 em 1 para cílios e sobrancelhas mais fortes.",
    description:
      "Sérum de uso diário que reúne ácido hialurônico, vitamina E, queratina e prohairin em uma única fórmula, pensado para cílios e sobrancelhas mais longos, volumosos e saudáveis. Prolonga os resultados dos procedimentos profissionais no conforto de casa.",
    highlights: [
      "Fórmula 4 em 1",
      "Com ácido hialurônico e vitamina E",
      "Uso diário",
      "Prolonga resultados profissionais",
    ],
    image: "/images/products/12-master-lash-brow-serum.webp",
    images: ["/images/products/12-master-lash-brow-serum.webp"],
    externalUrl: "#",
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
