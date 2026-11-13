import { cn } from "@/lib/cn";

/**
 * The ATELIER logotype: Cormorant Garamond, uppercase, widely tracked.
 * The negative end margin cancels the trailing letter-spacing so the mark centres optically.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-medium uppercase leading-none tracking-[0.32em] -me-[0.32em]", className)}>
      Atelier
    </span>
  );
}
