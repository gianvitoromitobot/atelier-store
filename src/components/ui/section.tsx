import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const tones = {
  default: "",
  surface: "bg-surface",
  /** Black band: flips all semantic colors for its children. */
  inverse: "tone-inverse",
} as const;

const spacing = {
  none: "",
  /** Half rhythm — for stacked, related blocks. */
  tight: "py-[calc(var(--section-y)/2)]",
  /** Standard rhythm: 48 / 72 / 96px. */
  default: "py-section",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: keyof typeof tones;
  spacing?: keyof typeof spacing;
};

export function Section({
  tone = "default",
  spacing: space = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn(tones[tone], spacing[space], className)} {...props} />
  );
}
