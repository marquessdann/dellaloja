import { Reveal } from "./Reveal";
import { siteConfig } from "@/data/site-config";

export function InstitutionalBanner() {
  return (
    <section className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,155,63,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/15" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/8" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="font-display text-6xl italic text-gold-500">
            &ldquo;
          </span>
          <p className="-mt-6 font-display text-3xl font-semibold italic leading-snug text-navy-900 sm:text-4xl">
            {siteConfig.institutionalSlogan}
          </p>
          <span className="mx-auto mt-7 block h-px w-16 bg-gold-500" />
        </Reveal>
      </div>
    </section>
  );
}
