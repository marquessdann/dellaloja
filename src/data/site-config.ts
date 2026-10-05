// Mensagem pré-preenchida ao abrir o WhatsApp pelo site — mantém o número e
// o texto consistentes em todos os botões/links que usam whatsappLink.
const WHATSAPP_MESSAGE =
  "Olá, vim através do site da Della Distribuidora e gostaria de tirar uma dúvida! Pode me ajudar?!";

export const siteConfig = {
  name: "DELLA",
  fullName: "Della Distribuidora de Produtos",
  tagline: "Distribuidora de Produtos",
  heroSlogan: "Tudo o que você procura,\nem um só lugar.",
  institutionalSlogan: "Variedade para todos os momentos.",
  ctaSlogan: "Encontre o que combina com você.",
  footerSlogan: "Levando qualidade, entregando confiança.",
  description:
    "A Della é uma loja online com produtos selecionados para tornar suas escolhas mais simples, práticas e especiais.",
  contact: {
    email: "contato@dellastore.com.br",
    whatsapp: "41 99679-0904",
    whatsappLink: `https://wa.me/5541996790904?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    instagram: "@dellanewstore",
    instagramLink: "https://www.instagram.com/dellanewstore",
    address: "Rua Assis Figueiredo, 59 - Guaíra, Curitiba - PR, CEP 80.630-280",
  },
  marketplaces: [
    {
      label: "Mercado Livre",
      href: "https://lista.mercadolivre.com.br/_CustId_3692836444?item_id=MLB5305023545&category_id=MLB199175&seller_id=3692836444&client=recoview-selleritems&recos_listing=true#origin=pdp&component=sellerData&typeSeller=classic",
    },
    {
      label: "Shopee",
      href: "https://shopee.com.br/dellanewstore?categoryId=100630&entryPoint=ShopByPDP&itemId=58219618143",
    },
    { label: "TikTok Shop", href: "#" },
  ],
  nav: [
    { label: "Início", href: "/" },
    { label: "Produtos", href: "/produtos" },
    { label: "Categorias", href: "/categorias" },
    { label: "Sobre a Della", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ],
} as const;
