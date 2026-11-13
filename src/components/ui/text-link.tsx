import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type TextLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  /** "muted" for secondary links (footer, breadcrumbs). */
  tone?: "default" | "muted";
};

/** Inline link: underlined by default, underline fades on hover. */
export function TextLink({ tone = "default", className, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn("link", tone === "muted" && "text-muted hover:text-foreground", className)}
      {...props}
    />
  );
}
