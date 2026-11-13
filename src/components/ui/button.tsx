import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const base =
  "eyebrow inline-flex items-center justify-center gap-2 border whitespace-nowrap " +
  "transition-colors duration-300 ease-atelier " +
  "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40";

const variants = {
  /** Main action (Add to bag, Checkout). One per view. */
  primary:
    "border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground",
  /** Secondary action next to a primary, or standalone on plain backgrounds. */
  secondary:
    "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
  /** CTA placed on photography/video. Always white, independent of tone. */
  overlay:
    "border-white bg-transparent text-white backdrop-blur-[2px] hover:bg-white hover:text-black",
  /** Text-only action with an underline (e.g. "Filter and sort"). */
  ghost:
    "border-transparent bg-transparent px-0! text-foreground underline underline-offset-[0.35em] decoration-1 hover:decoration-transparent",
} as const;

const sizes = {
  sm: "h-10 px-5",
  md: "h-12 px-6",
} as const;

export type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
}: ButtonStyleProps = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full");
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & ButtonStyleProps;

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & ButtonStyleProps;

/** Navigation that looks like a button (e.g. "Shop now"). */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}
