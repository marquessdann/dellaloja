import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, AtSign, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-cream-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex flex-col items-start leading-none">
              <Image
                src="/images/della-wordmark.webp"
                alt="Della"
                width={1059}
                height={200}
                className="h-auto w-[170px] sm:w-[190px]"
              />
              <span className="mt-3 flex items-center gap-2">
                <span className="h-px w-4 bg-gold-400/60" />
                <span className="text-[10px] font-semibold tracking-[0.32em] text-cream-300 uppercase">
                  Distribuidora de Produtos
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-cream-300/80">
              {siteConfig.description}
            </p>
            <p className="mt-5 font-display text-xl text-cream-100">
              {siteConfig.footerSlogan}
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.24em] text-cream-300 uppercase">
              Navegação
            </h3>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-cream-300/90 hover:text-cream-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.24em] text-cream-300 uppercase">
              Categorias
            </h3>
            <ul className="mt-5 space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/produtos?categoria=${cat.slug}`}
                    className="link-underline text-sm text-cream-300/90 hover:text-cream-100"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 border-t border-cream-100/10 pt-8 sm:grid-cols-3">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="group flex items-center gap-3 text-sm text-cream-200/90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
              <Mail size={16} />
            </span>
            {siteConfig.contact.email}
          </a>
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-sm text-cream-200/90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
              <MessageCircle size={16} />
            </span>
            {siteConfig.contact.whatsapp}
          </a>
          <a
            href={siteConfig.contact.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-sm text-cream-200/90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
              <AtSign size={16} />
            </span>
            {siteConfig.contact.instagram}
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-cream-100/10 pt-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream-300/60">
            Compre também em
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium text-cream-200">
            {siteConfig.marketplaces.map((marketplace, i) => (
              <span key={marketplace.label} className="flex items-center gap-3">
                {i > 0 && <span className="text-cream-100/20">|</span>}
                <a
                  href={marketplace.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-gold-400"
                >
                  {marketplace.label}
                </a>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-cream-100/10 pt-6 text-xs text-cream-300/60">
          <p className="text-center">
            © {new Date().getFullYear()} Della Distribuidora de Produtos. Todos os direitos reservados.
          </p>
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline flex items-center gap-1 text-cream-200"
          >
            Fale com a Della <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
