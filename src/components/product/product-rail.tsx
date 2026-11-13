"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

type ProductRailProps = {
  /** Accessible name for the scroll region. */
  label: string;
  children: ReactNode;
};

const arrow =
  "inline-flex size-10 items-center justify-center rounded-full border border-line-strong " +
  "transition-colors duration-300 ease-atelier hover:bg-foreground hover:text-background";

/**
 * Horizontally scrolling, snap-aligned row of cards. Touch/trackpad scroll natively;
 * the round arrows (≥md) page by one viewport of the rail for mouse users.
 * Children should be <ProductRailItem> elements.
 */
export function ProductRail({ label, children }: ProductRailProps) {
  const ref = useRef<HTMLUListElement>(null);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        tabIndex={0}
        className="scrollbar-none flex snap-x snap-mandatory gap-px overflow-x-auto overscroll-x-contain"
      >
        {children}
      </ul>
      <div className="container-page mt-6 hidden justify-end gap-2 md:flex">
        <button type="button" aria-label="Scroll left" className={arrow} onClick={() => page(-1)}>
          <ArrowLeftIcon />
        </button>
        <button type="button" aria-label="Scroll right" className={arrow} onClick={() => page(1)}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

export function ProductRailItem({ children }: { children: ReactNode }) {
  return <li className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-[31%] lg:w-[23%]">{children}</li>;
}
