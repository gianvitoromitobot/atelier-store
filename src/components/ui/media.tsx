import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const ratios = {
  /** Product packshot tile. */
  square: "aspect-square",
  /** On-model / portrait imagery. */
  portrait: "aspect-[3/4]",
  /** Editorial landscape. */
  landscape: "aspect-[16/9]",
  /** Category hero: square on phones, 2:1 from lg. */
  hero: "aspect-square md:aspect-[4/3] lg:aspect-[2/1]",
  /** Fullscreen campaign media (fills the viewport under the header). */
  screen: "h-[100svh]",
} as const;

type MediaProps = ComponentPropsWithoutRef<"div"> & {
  ratio?: keyof typeof ratios;
  /** Adds a bottom scrim so overlaid white text stays legible. */
  scrim?: boolean;
};

/**
 * Fixed-ratio frame for images/video on the neutral media ground.
 * Put a `next/image` with `fill` (and `className="object-cover"` or `object-contain`) inside.
 */
export function Media({ ratio = "square", scrim = false, className, children, ...props }: MediaProps) {
  return (
    <div className={cn("relative overflow-hidden bg-media", ratios[ratio], className)} {...props}>
      {children}
      {scrim && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent"
        />
      )}
    </div>
  );
}
