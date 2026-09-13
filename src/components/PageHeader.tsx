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
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(211,179,101,0.9) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
              <span className="h-px w-8 bg-gold-500" />
              {eyebrow}
              <span className="h-px w-8 bg-gold-500" />
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-semibold text-cream-100 sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream-300/85">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
