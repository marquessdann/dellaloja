import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  dark = false,
  iconOnly = false,
}: {
  className?: string;
  dark?: boolean;
  iconOnly?: boolean;
}) {
  const textColor = dark ? "text-cream-100" : "text-navy-900";
  const subColor = dark ? "text-cream-300" : "text-navy-500";
  const lineColor = dark ? "bg-gold-400/60" : "bg-gold-500/70";

  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3.5 shrink-0", className)}
      aria-label="Della Distribuidora de Produtos - Início"
    >
      <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-lg lg:h-14 lg:w-14">
        <Image
          src="/images/logo-mark.webp"
          alt="Della"
          fill
          sizes="56px"
          className="object-cover"
          priority
        />
      </span>
      {!iconOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.7rem] font-semibold tracking-[0.02em]",
              textColor
            )}
          >
            Della
          </span>
          <span className="mt-1.5 flex items-center gap-1.5">
            <span className={cn("h-px w-3", lineColor)} />
            <span
              className={cn(
                "text-[9px] font-semibold tracking-[0.32em] uppercase",
                subColor
              )}
            >
              Distribuidora
            </span>
          </span>
        </span>
      )}
    </Link>
  );
}
