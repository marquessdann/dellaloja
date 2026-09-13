import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="grain-overlay relative overflow-hidden bg-navy-950 py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(220,183,104,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          {eyebrow && (
            <span className="ornament-rule mx-auto max-w-xs text-[11px] font-bold uppercase tracking-[0.32em] text-gold-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 font-display text-5xl font-semibold italic text-cream-100 sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-cream-300/80">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
