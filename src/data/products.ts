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
  /** One button per marketplace link; when set, replaces the single externalUrl/buyButtonLabel button on the product page. */
  marketplaceLinks?: { label: string; url: string }[];
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
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5288912475-body-splash-enaldinho-treta-citrica-corporal-120ml-unissex-fragrncia-citrica-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58268946196",
      },
    ],
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
    isBestSeller: true,
    buyButtonLabel: "Veja na Shopee",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5289241709-body-splash-enaldinho-gelo-sinistro-120ml-masculino-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58268954948",
      },
    ],
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
      "/images/products/14-explosao-cosmica-body-splash-enaldinho-destaques.webp",
      "/images/products/14-explosao-cosmica-body-splash-enaldinho-frutada.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
    buyButtonLabel: "Veja na Shopee",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5325275209-body-splash-enaldinho-exp-cosmica-unissex-120ml-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58218980035",
      },
    ],
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
    isBestSeller: true,
    buyButtonLabel: "Veja na Shopee",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/body-splash-enaldinho-chiclete-irado--120ml/up/MLBU5378463776",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58218961064",
      },
    ],
  },
  {
    id: "16",
    slug: "gel-controle-mental-gelatinoso",
    name: "Controle Mental Gelatinoso - Gel para Cabelo 170g (unissex)",
    brand: "Enaldinho",
    category: "body-splash",
    shortDescription: "Gel modelador com efeito gelado, fixação leve e fragrância Ice Water.",
    description:
      "Um gel modelador que define o penteado com fixação leve e efeito natural. Textura que não gruda nas mãos nem nos fios, ideal pra montar o visual rápido antes de sair de casa. Tem a fragrância Ice Water, de perfil fresco e com um toque de menta, e o mentol na fórmula garante um efeito gelado no cabelo assim que aplica. Conta com Pantenol e Glicerol, que hidratam e ajudam a manter os fios macios, sem ressecar. Como usar: aplique uma pequena quantidade nos cabelos limpos e úmidos e modele. Para definição extra, reaplique uma pequena quantidade nos fios secos, sem excesso. Não precisa enxaguar. Fórmula vegana, dermatologicamente e oftalmologicamente testada, e não testada em animais.",
    highlights: [
      "Fragrância Ice Water",
      "Fixação leve e efeito natural",
      "Não gruda nas mãos nem nos fios",
      "Efeito gelado com mentol",
      "Com Pantenol e Glicerol",
      "Vegana",
      "Dermatologicamente testada",
      "Oftalmologicamente testada",
      "Não testada em animais",
      "170g",
    ],
    image: "/images/products/16-controle-mental-gel-cabelo-enaldinho.webp",
    images: ["/images/products/16-controle-mental-gel-cabelo-enaldinho.webp"],
    externalUrl: "#",
    isBestSeller: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5317245545-gel-para-cabelo-enaldinho-controle-mental-efeito-gelado-170g-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58269450316",
      },
    ],
  },
  {
    id: "17",
    slug: "hidratante-labial-chiclete-congelante",
    name: "Chiclete Congelante - Hidratante Labial Incolor 18g (unissex)",
    brand: "Enaldinho",
    category: "body-splash",
    shortDescription: "Hidratante labial de chiclete com efeito congelante e toque incolor.",
    description:
      "Um hidratante labial com aroma de chiclete e tutti-frutti, docinho e gostoso, que surpreende com um efeito congelante na primeira aplicação — aquele frescor que vicia e vira brincadeira com os amigos. Deixa os lábios macios e protegidos contra o ressecamento, com uma textura leve que não fica pesada nem grudenta. Conta com Manteiga de Karité, que hidrata e dá maciez aos lábios, e Mentol, que garante o efeito gelado surpreendente. Como usar: aplique nos lábios ao longo do dia e antes de dormir, sempre que quiser renovar a sensação. Fórmula incolor, vegana, hipoalergênica, dermatologicamente testada e não testada em animais, para meninas e meninos. Faz parte da linha Mutação Labial, que também tem as versões Milk Shake de Morango e Chocomenta Subzero. Colecione as três.",
    highlights: [
      "Aroma de chiclete e tutti-frutti",
      "Efeito congelante refrescante",
      "Hidrata e protege contra o ressecamento",
      "Textura leve, não grudenta",
      "Com Manteiga de Karité",
      "Com Mentol",
      "Fórmula incolor",
      "Vegana",
      "Hipoalergênica",
      "18g",
    ],
    image: "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho.webp",
    images: [
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-textura.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-aplicacao.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-destaques.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-lab.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-lifestyle.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-neon.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-caixa.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5324895533-hidratante-labial-enaldinho-chiclete-congelante-10g-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219429441",
      },
    ],
  },
  {
    id: "18",
    slug: "hidratante-labial-chocomenta-subzero",
    name: "Chocomenta Subzero - Hidratante Labial Incolor 10g (unissex)",
    brand: "Enaldinho",
    category: "body-splash",
    shortDescription: "Hidratante labial de chocolate com menta e efeito gelado intenso.",
    description:
      "Um hidratante labial com aroma e sabor de chocolate com menta bem marcantes, um combo irresistível que traz um efeito gelado intenso logo na primeira aplicação — aquele frescor que vicia e vira brincadeira com os amigos. Deixa os lábios macios e protegidos contra o ressecamento, com uma textura leve que não fica pesada nem grudenta. Conta com Manteiga de Karité, que hidrata e dá maciez aos lábios, e Mentol, que garante o efeito gelado ainda mais intenso. Como usar: aplique nos lábios ao longo do dia e antes de dormir, sempre que quiser renovar a sensação. Fórmula incolor, vegana, hipoalergênica, dermatologicamente testada e não testada em animais, para meninas e meninos. Faz parte da linha Mutação Labial, que também tem as versões Milk Shake de Morango e Chiclete Congelante. Colecione as três.",
    highlights: [
      "Aroma e sabor de chocolate com menta",
      "Efeito gelado intenso",
      "Hidrata e protege contra o ressecamento",
      "Textura leve, não grudenta",
      "Com Manteiga de Karité",
      "Com Mentol",
      "Fórmula incolor",
      "Vegana",
      "Hipoalergênica",
      "10g",
    ],
    image: "/images/products/18-chocomenta-subzero-hidratante-labial-enaldinho.webp",
    images: [
      "/images/products/18-chocomenta-subzero-hidratante-labial-enaldinho.webp",
      "/images/products/18-chocomenta-subzero-hidratante-labial-enaldinho-destaques.webp",
      "/images/products/18-chocomenta-subzero-hidratante-labial-enaldinho-lab.webp",
      "/images/products/18-chocomenta-subzero-hidratante-labial-enaldinho-neon.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5324933883-hidratante-labial-enaldinho-chocomenta-subzero-10g-_JM",
      },
    ],
  },
  {
    id: "19",
    slug: "hidratante-labial-milkshake-morango",
    name: "Milk Shake de Morango - Hidratante Labial Incolor 10g (unissex)",
    brand: "Enaldinho",
    category: "body-splash",
    shortDescription: "Hidratante labial de milk shake de morango com efeito gelado surpreendente.",
    description:
      "Um hidratante labial com aroma de frutas vermelhas, o cheirinho doce e cremoso de milk shake de morango, que traz um frescor gelado surpreendente logo na primeira aplicação — aquele efeito que vicia e vira brincadeira com os amigos. Deixa os lábios macios e protegidos contra o ressecamento, com uma textura leve que não fica pesada nem grudenta. Conta com Manteiga de Karité, que hidrata e dá maciez aos lábios, e Mentol, que garante o efeito gelado. Como usar: aplique nos lábios ao longo do dia e antes de dormir, sempre que quiser renovar a sensação. Fórmula incolor, vegana, hipoalergênica, dermatologicamente testada e não testada em animais, para meninas e meninos. Faz parte da linha Mutação Labial, que também tem as versões Chocomenta Subzero e Chiclete Congelante. Colecione as três.",
    highlights: [
      "Aroma de frutas vermelhas e milk shake de morango",
      "Efeito gelado surpreendente",
      "Hidrata e protege contra o ressecamento",
      "Textura leve, não grudenta",
      "Com Manteiga de Karité",
      "Com Mentol",
      "Fórmula incolor",
      "Vegana",
      "Hipoalergênica",
      "10g",
    ],
    image: "/images/products/19-milkshake-morango-hidratante-labial-enaldinho.webp",
    images: [
      "/images/products/19-milkshake-morango-hidratante-labial-enaldinho.webp",
      "/images/products/19-milkshake-morango-hidratante-labial-enaldinho-destaques.webp",
      "/images/products/19-milkshake-morango-hidratante-labial-enaldinho-lab.webp",
      "/images/products/19-milkshake-morango-hidratante-labial-enaldinho-neon.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-7739352220-hidratante-labial-enaldinho-milk-shake-de-morango-10g-_JM",
      },
    ],
  },
  {
    id: "20",
    slug: "kit-henna-sobrancelhas-master",
    name: "Kit Master Henna - Castanho Claro, Médio e Escuro",
    brand: "Master",
    category: "sobrancelhas",
    shortDescription: "Kit com as 3 tonalidades de henna profissional para sobrancelhas Master: castanho claro, médio e escuro.",
    description:
      "Kit Master Henna: kit profissional com as 3 tonalidades de henna para sobrancelhas — castanho claro, castanho médio e castanho escuro, 3g cada. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas com naturalidade e cobrir toda a variedade de tons de sobrancelha. Acabamento suave e profissional, com mistura fácil e ótimo rendimento. Cada tonalidade acompanha fixador e intensificador de henna, cubeta, espátula e sachê para aplicação.",
    highlights: [
      "Kit com as 3 tonalidades: castanho claro, médio e escuro",
      "Define e corrige falhas com naturalidade",
      "Acabamento suave e profissional",
      "Mistura fácil e ótimo rendimento",
      "Com extratos de Jaborandi e Bamboo",
      "Formato em pó, 3g cada tonalidade",
      "Acompanha fixador e intensificador de henna",
    ],
    image: "/images/products/20-kit-henna-sobrancelhas-master.webp",
    images: [
      "/images/products/20-kit-henna-sobrancelhas-master.webp",
      "/images/products/20-kit-henna-sobrancelhas-master-aplicacao.webp",
      "/images/products/20-kit-henna-sobrancelhas-master-texturas.webp",
      "/images/products/20-kit-henna-sobrancelhas-master-kit.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/kit-henna-sobrancelhas-master-castanho-claro-medio-e-escuro/up/MLBU3459364955?pdp_filters=item_id%3AMLB5765210048&quantity=1",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58269795372",
      },
    ],
  },
  {
    id: "24",
    slug: "cola-cilios-charm-master-3g",
    name: "Cola Adesivo para Extensão de Cílios Charm Master 3g",
    brand: "Master Elite",
    category: "cilios",
    shortDescription: "Cola profissional para extensão de cílios com secagem ultrarrápida e retenção de até 9 semanas.",
    description:
      "Apresentamos a Charm, a nova cola profissional para extensão de cílios desenvolvida para ser a estrela do seu estúdio. Com secagem ultrarrápida de 0,3 a 1 segundo, acompanha o ritmo das profissionais mais ágeis, evitando stickies e otimizando o tempo do atendimento. Garante retenção extraordinária, com cílios intactos por até 9 semanas. Tem uma janela de trabalho ampla, com alta performance em temperaturas de 16°C a 30°C e umidade de 30% a 75%, garantindo estabilidade em diferentes condições de estúdio. Indicada exclusivamente para procedimentos profissionais de extensão de cílios realizados por lash designers. Não usar em tufo e não fazer auto aplicação.",
    highlights: [
      "Secagem de 0,3 a 1 segundo",
      "Retenção de até 9 semanas",
      "Temperatura ideal de 16°C a 30°C",
      "Umidade ideal de 30% a 75%",
      "Viscosidade fina",
      "3g por embalagem",
      "País de origem: Coreia do Sul",
      "Uso exclusivamente profissional",
    ],
    image: "/images/products/24-cola-cilios-charm-master-3g.webp",
    images: [
      "/images/products/24-cola-cilios-charm-master-3g.webp",
      "/images/products/24-cola-cilios-charm-master-3g-detalhe.webp",
      "/images/products/24-cola-cilios-charm-master-3g-especificacoes.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/cola-adesivo-charm-master-extensao-alongamento-de-cilios-3ml/up/MLBU5379966018",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58269640563",
      },
    ],
  },
  {
    id: "25",
    slug: "kit-pinca-ponta-fina-edel-solingen-inox",
    name: "Kit 3 Pinças Ponta Fina Edel Solingen Aço Inox",
    brand: "Edel Solingen",
    category: "pinca-depilacao",
    shortDescription: "Kit com 3 pinças ponta fina idênticas em aço inox, ideais para pelos curtos e finos.",
    description:
      "Kit com 3 pinças ponta fina idênticas Edel Solingen — Ref. 2271504, produzidas em aço inoxidável de alta qualidade para remover até os pelos mais curtos e finos com facilidade e um acabamento impecável. As pontas finas são perfeitamente alinhadas, garantindo ótima aderência mesmo nos pelos mais curtos, com alta durabilidade e resistência ao desgaste do dia a dia. Ideal para pelos encravados, trabalhos de alta precisão e acabamentos detalhados. Ter 3 pinças traz mais praticidade e economia: profissionais podem alternar entre clientes enquanto uma é higienizada, sempre com uma reserva pronta para uso — deixe uma em casa, uma no trabalho e uma na bolsa. Perfeito para designers de sobrancelhas, profissionais da beleza e uso pessoal.",
    highlights: [
      "Kit com 3 pinças ponta fina idênticas — Ref. 2271504",
      "Aço inoxidável de alta qualidade",
      "Pontas finas perfeitamente alinhadas",
      "Ótima aderência em pelos curtos e finos",
      "Resistente ao desgaste do dia a dia",
      "Ideal para pelos encravados e acabamentos detalhados",
      "Mais praticidade e economia com 3 unidades",
      "Indicado para designers de sobrancelhas e uso pessoal",
    ],
    image: "/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox-trio-render.webp",
    images: [
      "/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox-trio-render.webp",
      "/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox-trio.webp",
      "/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox.webp",
      "/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox-pontas.webp",
      "/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox-detalhe.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/kit-3-pincas-ponta-fina-edel-solingen-aco-inox/up/MLBU5307428323",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219026130",
      },
    ],
  },
  {
    id: "26",
    slug: "kit-pinca-laqueada-edel-solingen-curva-obliqua",
    name: "Kit 3 Pinças Laqueadas Ponta Fina Curva Oblíqua Edel Solingen",
    brand: "Edel Solingen",
    category: "pinca-depilacao",
    shortDescription: "Kit com 3 pinças laqueadas coloridas, pontas fina, oblíqua e curva.",
    description:
      "Kit com 3 pinças profissionais Edel Solingen em acabamento laqueado colorido, com pontas fina, oblíqua e curva para design de sobrancelhas e depilação de precisão. Cabo emborrachado antiderrapante para mais controle durante o uso, com a qualidade e a precisão Solingen legítimas em cada ponta. Esterilizável com álcool 70%, ideal para uso profissional em estúdios de beleza e sobrancelhas.",
    highlights: [
      "Kit com 3 pinças: fina, oblíqua e curva",
      "Acabamento laqueado colorido",
      "Cabo emborrachado antiderrapante",
      "Qualidade Solingen legítima",
      "Esterilizável com álcool 70%",
      "Ideal para design de sobrancelhas profissional",
    ],
    image: "/images/products/26-kit-pinca-laqueada-edel-solingen-curva-obliqua.webp",
    images: [
      "/images/products/26-kit-pinca-laqueada-edel-solingen-curva-obliqua.webp",
      "/images/products/26-kit-pinca-laqueada-edel-solingen-curva-obliqua-detalhe.webp",
      "/images/products/26-kit-pinca-laqueada-edel-solingen-curva-obliqua-preta.webp",
      "/images/products/26-kit-pinca-laqueada-edel-solingen-curva-obliqua-uso.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/kit-3-pincas-laqueadas-ponta-fina-curva-obliqua-edel-solinge/up/MLBU5310285098?pdp_filters=item_id:MLB5292452561",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58269035891",
      },
    ],
  },
  {
    id: "27",
    slug: "kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen",
    name: "Kit Pinça Depilação 9cm Pontas Variadas Edel Solingen",
    brand: "Edel Solingen",
    category: "pinca-depilacao",
    shortDescription: "Kit de pinças 9cm com pontas douradas variadas para precisão milimétrica.",
    description:
      "Kit de pinças profissionais Edel Solingen de 9cm, com pontas de acabamento dourado e variedade de formatos para atender diferentes técnicas de design de sobrancelhas e depilação. Ponta estreita e reta para precisão milimétrica, com caneluras internas que garantem aderência superior mesmo em pelos mais finos e curtos, sem quebrar. Aço inox premium com qualidade Solingen legítima, esterilizável e de longa duração.",
    highlights: [
      "Pontas variadas em acabamento dourado",
      "9cm — precisão milimétrica",
      "Caneluras internas — maior aderência",
      "Agarra pelos finos e curtos sem quebrar",
      "Aço inox premium",
      "Qualidade Solingen legítima",
      "Esterilizável com álcool 70%",
    ],
    image: "/images/products/27-kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen.webp",
    images: [
      "/images/products/27-kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen.webp",
      "/images/products/27-kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen-pontas.webp",
      "/images/products/27-kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen-detalhe.webp",
      "/images/products/27-kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen-uso.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5292305735-kit-pinca-depilaco-9cm-pontas-variadas-edel-solingen-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219012276",
      },
    ],
  },
  {
    id: "28",
    slug: "kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha",
    name: "Kit 3 Pinças Ponta Fina Edel Solingen Aço Inox Sobrancelha",
    brand: "Edel Solingen",
    category: "pinca-depilacao",
    shortDescription: "Kit com 3 pinças ponta fina idênticas em aço inox, para sobrancelhas e pelos curtos.",
    description:
      "Kit com 3 pinças ponta fina idênticas Edel Solingen, ideais para remover até os pelos mais curtos e finos com facilidade, garantindo um acabamento impecável. Com 3 unidades, você sempre tem uma pinça à mão: no estúdio, em casa ou na bolsa. Produzidas em aço inoxidável de alta qualidade, com pontas finas perfeitamente alinhadas e de alta precisão, garantem ótima aderência até nos pelos mais curtos, além de alta durabilidade, resistência ao desgaste do dia a dia, conforto e excelente desempenho. Indicada para pelos curtos e finos, pelos encravados, trabalhos de alta precisão e acabamentos detalhados. Profissionais podem alternar entre clientes enquanto uma pinça é higienizada, sempre com uma reserva pronta para uso. Ideal para designers de sobrancelhas, profissionais da beleza e uso pessoal.",
    highlights: [
      "Kit com 3 pinças ponta fina idênticas",
      "Aço inoxidável de alta qualidade",
      "Pontas finas perfeitamente alinhadas e de alta precisão",
      "Ótima aderência até nos pelos mais curtos",
      "Alta durabilidade e resistência ao desgaste",
      "Conforto e excelente desempenho",
      "Ideal para pelos encravados e acabamentos detalhados",
      "Indicado para designers de sobrancelhas",
    ],
    image: "/images/products/28-kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha-trio.webp",
    images: [
      "/images/products/28-kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha-trio.webp",
      "/images/products/28-kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha.webp",
      "/images/products/28-kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha-kit.webp",
      "/images/products/28-kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha-pontas.webp",
      "/images/products/28-kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha-detalhe.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/kit-3-pincas-ponta-fina-edel-solingen-aco-inox-sobrancelha/up/MLBU5307703075",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219283545",
      },
    ],
  },
  {
    id: "29",
    slug: "cola-cilios-master-elite-purple-diamond-3g",
    name: "Cola para Extensão de Cílios Master Elite Purple Diamond 3g",
    brand: "Master Elite",
    category: "cilios",
    shortDescription: "Cola profissional para extensão de cílios com secagem ultrarrápida e retenção de até 7 semanas.",
    description:
      "A Purple Diamond é a cola profissional Master Elite para extensão de cílios, com secagem ultrarrápida de 0,5 a 1 segundo e retenção de até 7 semanas. Tem performance ideal em temperaturas de 16°C a 30°C e umidade de 30% a 75%, garantindo estabilidade em diferentes condições de estúdio. Acompanha a embalagem Magic Pack Master, com vedação completa e proteção contra temperatura e umidade para maior durabilidade do produto. Fórmula dermatologicamente e oftalmologicamente testada, com redução de irritações. Produto 100% original, fabricado na Coreia do Sul. Indicada exclusivamente para procedimentos profissionais de extensão de cílios realizados por lash designers.",
    highlights: [
      "Secagem de 0,5 a 1 segundo",
      "Retenção de até 7 semanas",
      "Temperatura ideal de 16°C a 30°C",
      "Umidade ideal de 30% a 75%",
      "Embalagem Magic Pack Master — vedação completa",
      "Dermatologicamente testada",
      "Oftalmologicamente testada",
      "3g por embalagem",
      "País de origem: Coreia do Sul",
      "Uso exclusivamente profissional",
    ],
    image: "/images/products/29-cola-cilios-master-elite-purple-diamond-3g.webp",
    images: [
      "/images/products/29-cola-cilios-master-elite-purple-diamond-3g.webp",
      "/images/products/29-cola-cilios-master-elite-purple-diamond-3g-detalhe.webp",
      "/images/products/29-cola-cilios-master-elite-purple-diamond-3g-aplicacao.webp",
      "/images/products/29-cola-cilios-master-elite-purple-diamond-3g-especificacoes.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5325889851-cola-extenso-de-cilios-master-elite-purple-diamond-secagem-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219623204",
      },
    ],
  },
  {
    id: "30",
    slug: "cola-cilios-master-elite-ruby-3g",
    name: "Cola para Extensão de Cílios Master Elite Ruby 3g",
    brand: "Master Elite",
    category: "cilios",
    shortDescription: "Cola profissional com adesivo preto, secagem de 0,5 a 1 segundo e retenção de até 7 semanas.",
    description:
      "A Ruby é a cola profissional Master Elite para extensão de cílios, com adesivo preto, secagem de 0,5 a 1 segundo e retenção de até 7 semanas. Tem performance ideal em temperaturas de 18°C a 28°C e umidade de 40% a 80%, sendo adaptável a variações climáticas típicas de países tropicais. Fórmula de viscosidade fina, com baixo nível de odor e ardor, hipoalergênica e durável. Acompanha a embalagem Magic Pack Master, com vedação completa e proteção contra temperatura e umidade. Produto aprovado pela ANVISA, fabricado na Coreia do Sul. Indicada exclusivamente para procedimentos profissionais de extensão de cílios realizados por lash designers.",
    highlights: [
      "Adesivo preto",
      "Secagem de 0,5 a 1 segundo",
      "Retenção de até 7 semanas",
      "Temperatura ideal de 18°C a 28°C",
      "Umidade ideal de 40% a 80%",
      "Viscosidade fina",
      "Baixo nível de odor e ardor",
      "Hipoalergênica e durável",
      "Aprovado pela ANVISA",
      "3g por embalagem",
      "Uso exclusivamente profissional",
    ],
    image: "/images/products/30-cola-cilios-master-elite-ruby-3g.webp",
    images: [
      "/images/products/30-cola-cilios-master-elite-ruby-3g.webp",
      "/images/products/30-cola-cilios-master-elite-ruby-3g-aplicacao.webp",
      "/images/products/30-cola-cilios-master-elite-ruby-3g-especificacoes.webp",
      "/images/products/30-cola-cilios-master-elite-ruby-3g-beneficios.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/cola-ruby-master-elite-3ml-preta-secagem-rapida-alongamento/up/MLBU5338459613",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219618143",
      },
    ],
  },
  {
    id: "31",
    slug: "cola-cilios-master-elite-pink-diamond-3g",
    name: "Cola para Extensão de Cílios Master Elite Pink Diamond 3g",
    brand: "Master Elite",
    category: "cilios",
    shortDescription: "Cola profissional para extensão de cílios com secagem ultrarrápida e retenção de até 7 semanas.",
    description:
      "A Pink Diamond é a cola profissional Master Elite para extensão de cílios, com secagem ultrarrápida de 0,5 a 1 segundo e retenção de até 7 semanas. Tem performance ideal em temperaturas de 16°C a 30°C e umidade de 30% a 75%, garantindo estabilidade em diferentes condições de estúdio. Acompanha a embalagem Magic Pack Master, com vedação completa e proteção contra temperatura e umidade para maior durabilidade do produto. Fórmula dermatologicamente e oftalmologicamente testada, com redução de irritações. Produto 100% original, fabricado na Coreia do Sul. Indicada exclusivamente para procedimentos profissionais de extensão de cílios realizados por lash designers.",
    highlights: [
      "Secagem de 0,5 a 1 segundo",
      "Retenção de até 7 semanas",
      "Temperatura ideal de 16°C a 30°C",
      "Umidade ideal de 30% a 75%",
      "Embalagem Magic Pack Master — vedação completa",
      "Dermatologicamente testada",
      "Oftalmologicamente testada",
      "3g por embalagem",
      "País de origem: Coreia do Sul",
      "Uso exclusivamente profissional",
    ],
    image: "/images/products/31-cola-cilios-master-elite-pink-diamond-3g.webp",
    images: [
      "/images/products/31-cola-cilios-master-elite-pink-diamond-3g.webp",
      "/images/products/31-cola-cilios-master-elite-pink-diamond-3g-detalhe.webp",
      "/images/products/31-cola-cilios-master-elite-pink-diamond-3g-aplicacao.webp",
      "/images/products/31-cola-cilios-master-elite-pink-diamond-3g-especificacoes.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-5325906027-cola-para-cilios-master-elite-pink-diamond-3ml-secagem-rapid-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219624057",
      },
    ],
  },
  {
    id: "32",
    slug: "cola-cilios-master-elite-diamond-3g",
    name: "Cola para Extensão de Cílios Master Elite Diamond 3g",
    brand: "Master Elite",
    category: "cilios",
    shortDescription: "Adesivo coreano transparente, secagem de 1 a 1,5 segundo e retenção de até 7 semanas.",
    description:
      "A Diamond é o verdadeiro adesivo coreano transparente Master Elite para extensão de cílios, com fixação forte e duradoura — retenção de até 7 semanas — e secagem super rápida, de 1 a 1,5 segundo. Viscosidade fina, que facilita uma aplicação mais precisa e evita excesso de produto nas extensões, com baixo odor e irritação reduzida. Fórmula mais segura, livre de carbono e parabenos, reduzindo os riscos de reação em clientes com peles mais sensíveis. Adaptada ao clima tropical, com performance ideal em temperaturas de 18°C a 28°C e umidade de 40% a 80%. Produto certificado pela ANVISA, importado pela Vermonth. Indicada exclusivamente para procedimentos profissionais de extensão de cílios realizados por lash designers.",
    highlights: [
      "Adesivo coreano transparente",
      "Secagem de 1 a 1,5 segundo",
      "Retenção de até 7 semanas",
      "Temperatura ideal de 18°C a 28°C",
      "Umidade ideal de 40% a 80%",
      "Viscosidade fina — aplicação precisa",
      "Baixo odor e irritação reduzida",
      "Fórmula livre de carbono e parabenos",
      "Certificado pela ANVISA",
      "3g por embalagem",
      "Uso exclusivamente profissional",
    ],
    image: "/images/products/32-cola-cilios-master-elite-diamond-3g.webp",
    images: [
      "/images/products/32-cola-cilios-master-elite-diamond-3g.webp",
      "/images/products/32-cola-cilios-master-elite-diamond-3g-beneficios.webp",
      "/images/products/32-cola-cilios-master-elite-diamond-3g-especificacoes.webp",
      "/images/products/32-cola-cilios-master-elite-diamond-3g-uso.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/cola-diamond-p-alongamento-de-cilios-secagem-rapida/up/MLBU5338696129",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219619426",
      },
    ],
  },
  {
    id: "33",
    slug: "cola-cilios-master-elite-emerald-3g",
    name: "Cola para Extensão de Cílios Master Elite Emerald 3g",
    brand: "Master Elite",
    category: "cilios",
    shortDescription: "Cola profissional com secagem ultrarrápida de 0,5 segundo e retenção de até 7 semanas.",
    description:
      "A Emerald é a cola profissional Master Elite para extensão de cílios, com secagem ultrarrápida de 0,5 segundo e retenção de até 7 semanas, garantindo acabamento impecável. Versátil em diferentes níveis de umidade e temperatura, tem performance ideal em temperaturas de 18°C a 24°C e umidade de 30% a 75%. Possui selo holográfico e registro na ANVISA, evitando problemas com falsificação — o produto original traz garantia completa. Indicada exclusivamente para procedimentos profissionais de extensão de cílios realizados por lash designers.",
    highlights: [
      "Secagem ultrarrápida de 0,5 segundo",
      "Retenção de até 7 semanas",
      "Temperatura ideal de 18°C a 24°C",
      "Umidade ideal de 30% a 75%",
      "Garante acabamento impecável",
      "Versátil em diferentes níveis de umidade e temperatura",
      "Selo holográfico de autenticidade",
      "Registro na ANVISA",
      "3g por embalagem",
      "Uso exclusivamente profissional",
    ],
    image: "/images/products/33-cola-cilios-master-elite-emerald-3g.webp",
    images: [
      "/images/products/33-cola-cilios-master-elite-emerald-3g.webp",
      "/images/products/33-cola-cilios-master-elite-emerald-3g-propriedades.webp",
      "/images/products/33-cola-cilios-master-elite-emerald-3g-beneficios.webp",
      "/images/products/33-cola-cilios-master-elite-emerald-3g-autenticidade.webp",
    ],
    externalUrl: "#",
    isNew: true,
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/cola-emerald-master-elite-3g-secagem-rapida-extensao-cilios/up/MLBU5380094104",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58269638745",
      },
    ],
  },
  {
    id: "34",
    slug: "henna-sobrancelhas-master-castanho-claro-3g",
    name: "Henna Para Sobrancelhas Master - Castanho Claro",
    brand: "Master",
    category: "sobrancelhas",
    shortDescription: "Henna profissional para sobrancelhas na cor castanho claro, com pigmentação uniforme.",
    description:
      "Henna profissional para sobrancelhas na cor castanho claro, com pigmentação uniforme e boa fixação. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas com naturalidade em sobrancelhas claras. Tom equilibrado e acabamento natural: define com suavidade e mantém a cor por mais tempo, com mistura fácil e ótimo rendimento. O kit vem com o fixador e intensificador de henna, além de cubeta, espátula e sachê para aplicação.",
    highlights: [
      "Define e corrige falhas com naturalidade",
      "Acabamento suave e profissional",
      "Mistura fácil e ótimo rendimento",
      "Ideal para sobrancelhas claras",
      "Com extratos de Jaborandi e Bamboo",
      "Cor Castanho Claro",
      "Formato em pó, 3g",
      "Acompanha fixador e intensificador de henna",
    ],
    image: "/images/products/34-henna-sobrancelhas-master-castanho-claro-3g.webp",
    images: [
      "/images/products/34-henna-sobrancelhas-master-castanho-claro-3g.webp",
      "/images/products/34-henna-sobrancelhas-master-castanho-claro-3g-frasco.webp",
      "/images/products/34-henna-sobrancelhas-master-castanho-claro-3g-kit.webp",
      "/images/products/34-henna-sobrancelhas-master-castanho-claro-3g-fixador.webp",
      "/images/products/34-henna-sobrancelhas-master-castanho-claro-3g-acessorios.webp",
    ],
    externalUrl: "#",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/henna-castanho-claro-master-3g-profissional-sobrancelhas/up/MLBU5364917845?pdp_filters=item_id:MLB5337833365",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219777927",
      },
    ],
  },
  {
    id: "35",
    slug: "henna-sobrancelhas-master-castanho-medio-3g",
    name: "Henna Para Sobrancelhas Master - Castanho Médio",
    brand: "Master",
    category: "sobrancelhas",
    shortDescription: "Henna profissional para sobrancelhas na cor castanho médio, com pigmentação uniforme.",
    description:
      "Henna profissional para sobrancelhas na cor castanho médio, com pigmentação uniforme e boa fixação. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas com naturalidade em sobrancelhas de tom médio. Tom equilibrado e acabamento natural: define com suavidade e mantém a cor por mais tempo, com mistura fácil e ótimo rendimento. O kit vem com o fixador e intensificador de henna, além de cubeta, espátula e sachê para aplicação.",
    highlights: [
      "Define e corrige falhas com naturalidade",
      "Acabamento suave e profissional",
      "Mistura fácil e ótimo rendimento",
      "Ideal para sobrancelhas de tom médio",
      "Com extratos de Jaborandi e Bamboo",
      "Cor Castanho Médio",
      "Formato em pó, 3g",
      "Acompanha fixador e intensificador de henna",
    ],
    image: "/images/products/35-henna-sobrancelhas-master-castanho-medio-3g.webp",
    images: [
      "/images/products/35-henna-sobrancelhas-master-castanho-medio-3g.webp",
      "/images/products/35-henna-sobrancelhas-master-castanho-medio-3g-fixador.webp",
      "/images/products/35-henna-sobrancelhas-master-castanho-medio-3g-acessorios.webp",
    ],
    externalUrl: "#",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "http://produto.mercadolivre.com.br/MLB-5337784715-henna-master-profissional-castanho-medio-para-sobrancelhas-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58269793667",
      },
    ],
  },
  {
    id: "36",
    slug: "henna-sobrancelhas-master-castanho-escuro-3g",
    name: "Henna Para Sobrancelhas Master - Castanho Escuro",
    brand: "Master",
    category: "sobrancelhas",
    shortDescription: "Henna profissional para sobrancelhas na cor castanho escuro, com alta cobertura e acabamento natural.",
    description:
      "Henna profissional para sobrancelhas na cor castanho escuro, com alta cobertura e boa fixação. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas e preencher visualmente sobrancelhas de tom escuro. Define o desenho com acabamento natural e mantém a cor por mais tempo, com mistura fácil e ótimo rendimento. O kit vem com o fixador e intensificador de henna, além de cubeta, espátula e sachê para aplicação.",
    highlights: [
      "Alta cobertura e definição do desenho",
      "Acabamento natural",
      "Auxilia no preenchimento visual das sobrancelhas",
      "Mistura fácil e ótimo rendimento",
      "Com extratos de Jaborandi e Bamboo",
      "Cor Castanho Escuro",
      "Formato em pó, 3g",
      "Acompanha fixador e intensificador de henna",
    ],
    image: "/images/products/36-henna-sobrancelhas-master-castanho-escuro-3g.webp",
    images: [
      "/images/products/36-henna-sobrancelhas-master-castanho-escuro-3g.webp",
      "/images/products/36-henna-sobrancelhas-master-castanho-escuro-3g-beneficios.webp",
      "/images/products/36-henna-sobrancelhas-master-castanho-escuro-3g-especificacoes.webp",
      "/images/products/36-henna-sobrancelhas-master-castanho-escuro-3g-kit.webp",
    ],
    externalUrl: "#",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://www.mercadolivre.com.br/henna-master-castanho-escuro-sobrancelha-profissional-3g/up/MLBU5364957177?pdp_filters=item_id:MLB5337828391",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58269802900",
      },
    ],
  },
  {
    id: "37",
    slug: "henna-sobrancelhas-master-preto-3g",
    name: "Henna Para Sobrancelhas Master - Preto",
    brand: "Master",
    category: "sobrancelhas",
    shortDescription: "Henna profissional para sobrancelhas na cor preto, com alta cobertura e fixação intensa.",
    description:
      "Henna profissional para sobrancelhas na cor preto, com alta cobertura e fixação intensa. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas e definir sobrancelhas de tom bem escuro ou preto. Define o desenho com acabamento uniforme e mantém a cor por mais tempo, com mistura fácil e ótimo rendimento. O kit vem com o fixador e intensificador de henna, além de cubeta, espátula e sachê para aplicação.",
    highlights: [
      "Alta cobertura e fixação intensa",
      "Define o desenho com acabamento uniforme",
      "Auxilia no preenchimento visual das sobrancelhas",
      "Mistura fácil e ótimo rendimento",
      "Com extratos de Jaborandi e Bamboo",
      "Cor Preto",
      "Formato em pó, 3g",
      "Acompanha fixador e intensificador de henna",
    ],
    image: "/images/products/37-henna-sobrancelhas-master-preto-3g.webp",
    images: [
      "/images/products/37-henna-sobrancelhas-master-preto-3g.webp",
      "/images/products/37-henna-sobrancelhas-master-preto-3g-ambiente.webp",
      "/images/products/37-henna-sobrancelhas-master-preto-3g-caracteristicas.webp",
      "/images/products/37-henna-sobrancelhas-master-preto-3g-kit.webp",
      "/images/products/37-henna-sobrancelhas-master-preto-3g-close.webp",
    ],
    externalUrl: "#",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "http://produto.mercadolivre.com.br/MLB-5337956293-henna-master-preto-sobrancelha-profissional-3g-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58219790333",
      },
    ],
  },
  {
    id: "38",
    slug: "henna-sobrancelhas-master-loiro-escuro-3g",
    name: "Henna Para Sobrancelhas Master - Loiro Escuro",
    brand: "Master",
    category: "sobrancelhas",
    shortDescription: "Henna profissional para sobrancelhas na cor loiro escuro, com pigmentação uniforme.",
    description:
      "Henna profissional para sobrancelhas na cor loiro escuro, com pigmentação uniforme e boa fixação. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas com naturalidade em sobrancelhas claras e loiras. Tom equilibrado e acabamento natural: define com suavidade e mantém a cor por mais tempo, com mistura fácil e ótimo rendimento. O kit vem com o fixador e intensificador de henna, além de cubeta, espátula e sachê para aplicação.",
    highlights: [
      "Define e corrige falhas com naturalidade",
      "Acabamento suave e profissional",
      "Mistura fácil e ótimo rendimento",
      "Ideal para sobrancelhas claras e loiras",
      "Com extratos de Jaborandi e Bamboo",
      "Cor Loiro Escuro",
      "Formato em pó, 3g",
      "Acompanha fixador e intensificador de henna",
    ],
    image: "/images/products/38-henna-sobrancelhas-master-loiro-escuro-3g.webp",
    images: [
      "/images/products/38-henna-sobrancelhas-master-loiro-escuro-3g.webp",
      "/images/products/38-henna-sobrancelhas-master-loiro-escuro-3g-frasco.webp",
      "/images/products/38-henna-sobrancelhas-master-loiro-escuro-3g-kit.webp",
      "/images/products/38-henna-sobrancelhas-master-loiro-escuro-3g-fixador.webp",
      "/images/products/38-henna-sobrancelhas-master-loiro-escuro-3g-acessorios.webp",
    ],
    externalUrl: "#",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "http://produto.mercadolivre.com.br/MLB-5338012403-henna-para-sobrancelhas-master-loiro-escuro-profissional-3-_JM",
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br/product/1931210934/58269806541",
      },
    ],
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
