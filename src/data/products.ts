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
    ],
    externalUrl: "#",
    isBestSeller: true,
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
    isBestSeller: true,
    buyButtonLabel: "Veja na Shopee",
    marketplaceLinks: [
      {
        label: "Ver no Mercado Livre",
        url: "https://produto.mercadolivre.com.br/MLB-7699634080-body-splash-enaldinho-chiclete-irado-120ml-_JM",
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
    buyButtonLabel: "Veja na Shopee",
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
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-destaques.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-lab.webp",
      "/images/products/17-chiclete-congelante-hidratante-labial-enaldinho-neon.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
    buyButtonLabel: "Veja na Shopee",
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
    buyButtonLabel: "Veja na Shopee",
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
    buyButtonLabel: "Veja na Shopee",
  },
  {
    id: "20",
    slug: "henna-sobrancelhas-master-loiro-escuro",
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
      "Formato em pó",
      "3g",
      "Acompanha fixador",
    ],
    image: "/images/products/20-henna-sobrancelhas-master-loiro-escuro.webp",
    images: [
      "/images/products/20-henna-sobrancelhas-master-loiro-escuro.webp",
      "/images/products/20-henna-sobrancelhas-master-loiro-escuro-frasco.webp",
      "/images/products/20-henna-sobrancelhas-master-loiro-escuro-kit.webp",
      "/images/products/20-henna-sobrancelhas-master-loiro-escuro-acessorios.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
  },
  {
    id: "21",
    slug: "protetor-palpebras-eyepatch-master-flor",
    name: "Protetor Para Pálpebras Eyepatch Master Flor",
    brand: "Master",
    category: "cilios",
    shortDescription: "Protetor de pálpebras em hidrogel, com recorte floral que cobre os cílios inferiores.",
    description:
      "Protetor de pálpebras em hidrogel, com recorte floral que acompanha o contorno do olho e cobre os cílios inferiores sem tocar na linha d'água — ideal para procedimentos de extensão de cílios e outros serviços que exigem proteção da pálpebra inferior. Modo de uso: retire a película protetora e aplique o Master Hidrogel Eye Patch Flor abaixo dos olhos, cobrindo os cílios inferiores sem tocar na linha d'água. Para uso externo apenas; evite que o produto entre nos olhos; não utilize em caso de vermelhidão na pele; em caso de irritação, lave os olhos com água corrente e interrompa a aplicação imediatamente; evite exposição do produto ao sol; mantenha fora do alcance de crianças.",
    highlights: [
      "Recorte floral que acompanha o contorno do olho",
      "Cobre os cílios inferiores sem tocar na linha d'água",
      "Hidrogel macio e confortável",
      "Ideal para extensão de cílios e outros procedimentos",
      "Para uso externo",
      "1 par por unidade",
    ],
    image: "/images/products/21-protetor-palpebras-eyepatch-master-flor.webp",
    images: [
      "/images/products/21-protetor-palpebras-eyepatch-master-flor.webp",
      "/images/products/21-protetor-palpebras-eyepatch-master-flor-verso.webp",
      "/images/products/21-protetor-palpebras-eyepatch-master-flor-uso.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
  },
  {
    id: "22",
    slug: "removedor-cilios-balm-olive-excellent",
    name: "Removedor De Cílios Balm Olive Excellent 7g",
    brand: "Excellent",
    category: "cilios",
    shortDescription: "Removedor em gel tipo balm para extensão de cílios, com azeite de oliva e uso profissional.",
    description:
      "O Removedor Gel Excellent Olive foi desenvolvido para profissionais que buscam praticidade e segurança na remoção de extensões de cílios. Sua fórmula contém azeite de oliva, que auxilia na remoção completa da cola enquanto contribui para a nutrição e hidratação dos cílios naturais. Com textura em gel tipo balm, permite uma aplicação localizada e controlada. Além disso, sua fórmula é hipoalergênica e livre de odores, proporcionando mais conforto durante o procedimento. Como usar: posicione um protetor de pálpebras abaixo dos cílios inferiores, aplique uma pequena quantidade sobre os fios evitando contato direto com a pele e os olhos, deixe agir por aproximadamente 10 a 15 minutos e remova cuidadosamente os cílios artificiais com dois microbrushes ou uma pinça apropriada. Após a remoção, higienize os cílios naturais com uma espuma de limpeza adequada. Produto de uso exclusivamente profissional, regularizado pela ANVISA.",
    highlights: [
      "Facilita a remoção completa da cola",
      "Textura em gel para aplicação precisa",
      "Procedimento seguro e indolor quando bem aplicado",
      "Remoção sem ardência",
      "Fórmula livre de odores",
      "Nutre e hidrata os cílios naturais",
      "Com azeite de oliva",
      "Hipoalergênico",
      "7g",
      "Uso profissional",
    ],
    image: "/images/products/22-removedor-cilios-balm-olive-excellent.webp",
    images: [
      "/images/products/22-removedor-cilios-balm-olive-excellent.webp",
      "/images/products/22-removedor-cilios-balm-olive-excellent-infografico.webp",
      "/images/products/22-removedor-cilios-balm-olive-excellent-aplicacao.webp",
      "/images/products/22-removedor-cilios-balm-olive-excellent-detalhes.webp",
      "/images/products/22-removedor-cilios-balm-olive-excellent-mao.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
  },
  {
    id: "23",
    slug: "pinca-cilios-7m-pro-master",
    name: "Pinça Profissional de Cílios 7M-PRO Master",
    brand: "Master",
    category: "cilios",
    shortDescription: "Pinça profissional para extensão de cílios, em aço inox com nanotecnologia diamantada.",
    description:
      "As pinças Master representam uma nova era no mundo lash: leve (específica para lashes), consistente (projetada ergonomicamente) e duradoura (aplicação 100% precisa). A Pinça Profissional de Cílios 7M-PRO Master é produzida em aço inox com tecnologia paquistanesa, resistente a autoclave, leve e extremamente precisa. Conta com nanotecnologia diamantada: uma superfície texturizada e microestruturada na ponta que aumenta a aderência e a precisão, facilitando o manuseio dos fios e evitando que deslizem — ideal para profissionais que buscam mais controle e eficiência na extensão de cílios.",
    highlights: [
      "Leve, específica para lashes",
      "Projetada ergonomicamente",
      "Aplicação 100% precisa",
      "Produzida em aço inox",
      "Tecnologia paquistanesa",
      "Resistente a autoclave",
      "Nanotecnologia diamantada na ponta",
      "Maior aderência e precisão",
      "Uso profissional",
    ],
    image: "/images/products/23-pinca-cilios-7m-pro-master.webp",
    images: [
      "/images/products/23-pinca-cilios-7m-pro-master.webp",
      "/images/products/23-pinca-cilios-7m-pro-master-infografico.webp",
      "/images/products/23-pinca-cilios-7m-pro-master-nanotecnologia.webp",
    ],
    externalUrl: "#",
    isBestSeller: true,
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
