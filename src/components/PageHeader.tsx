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
    <section className="relative overflow-hidden bg-cream-300/60 py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,155,63,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          {eyebrow && (
            <span className="ornament-rule mx-auto max-w-xs text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-600">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 font-display text-5xl font-bold text-navy-900 sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-navy-500">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
