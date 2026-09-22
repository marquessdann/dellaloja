import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { siteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  style: "normal",
  display: "swap",
});

const homeTitle = "Della Distribuidora de Produtos";
const homeDescription =
  "Tudo o que você procura, em um só lugar. Conheça o catálogo de produtos profissionais da Della Distribuidora.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s | Della",
  },
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: buildOpenGraph({ title: homeTitle, description: homeDescription, path: "/" }),
  twitter: buildTwitter({ title: homeTitle, description: homeDescription }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
