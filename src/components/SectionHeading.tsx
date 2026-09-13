import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em]",
            dark ? "text-gold-300" : "text-gold-600"
          )}
        >
          <span className="h-1 w-1 rotate-45 bg-current" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-4xl font-semibold sm:text-[2.75rem] sm:leading-[1.1]",
          dark ? "text-cream-100" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed",
            dark ? "text-cream-300/85" : "text-navy-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
