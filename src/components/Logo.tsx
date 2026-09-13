import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const ringColor = dark ? "border-gold-400" : "border-gold-500";
  const textColor = dark ? "text-cream-100" : "text-navy-900";
  const subColor = dark ? "text-gold-300" : "text-gold-600";

  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3 shrink-0", className)}
      aria-label="Della Distribuidora de Produtos - Início"
    >
      <span
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300",
          ringColor
        )}
      >
        <span className="font-display text-xl font-semibold tracking-tight text-gold-500">
          D
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-2xl font-semibold tracking-wide",
            textColor
          )}
        >
          DELLA
        </span>
        <span
          className={cn(
            "text-[9px] font-semibold tracking-[0.28em] uppercase",
            subColor
          )}
        >
          Distribuidora
        </span>
      </span>
    </Link>
  );
}
