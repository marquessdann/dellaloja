import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { WhatsappButton } from "@/components/WhatsappButton";

const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Della Distribuidora de Produtos",
    template: "%s | Della",
  },
  description:
    "Distribuindo qualidade, impulsionando negócios. Conheça o catálogo de produtos profissionais da Della Distribuidora.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream-200">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
