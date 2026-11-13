import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  /** 1440px max, responsive gutters (16 / 32 / 64px). */
  page: "container-page",
  /** 720px reading column for text and forms. */
  narrow: "container-narrow",
  /** Edge-to-edge (media, product grids). */
  bleed: "w-full",
} as const;

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizes;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Container<T extends ElementType = "div">({
  as,
  size = "page",
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return <Tag className={cn(sizes[size], className)} {...props} />;
}
