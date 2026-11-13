import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  /** Edge-to-edge catalogue grid: 2 cols → 3 (md) → 4 (lg), 1px gutters. */
  product: "grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-4",
  /** Two equal editorial panels, stacked on mobile. */
  split: "grid grid-cols-1 gap-px md:grid-cols-2",
  /** Content cards inside a container: 1 → 2 (md) → 3 (lg). */
  cards: "grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8",
} as const;

type GridProps = ComponentPropsWithoutRef<"div"> & {
  variant?: keyof typeof variants;
};

export function Grid({ variant = "product", className, ...props }: GridProps) {
  return <div className={cn(variants[variant], className)} {...props} />;
}

/** Make an item span two columns in a product grid (editorial tile; full width on phones). */
export const gridSpan2 = "col-span-2";
