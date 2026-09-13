import { siteConfig } from "@/data/site-config";

export function AnnouncementBar() {
  return (
    <div className="bg-navy-950 text-cream-200 text-[11px] sm:text-xs tracking-wide">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
        <span className="hidden sm:inline text-gold-400">✦</span>
        <p>
          {siteConfig.institutionalSlogan}{" "}
          <span className="text-gold-300">— conheça o catálogo Della</span>
        </p>
        <span className="hidden sm:inline text-gold-400">✦</span>
      </div>
    </div>
  );
}
