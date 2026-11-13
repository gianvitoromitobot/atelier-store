"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { navigation } from "@/lib/catalog";

type MenuDrawerProps = { open: boolean; onClose: () => void };

/**
 * Right-hand navigation drawer built on a modal <dialog>: focus trapping, Escape to close and the inert page
 * come from the platform. Slide/fade transitions live in globals.css (`.drawer`).
 */
export function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label="Menu"
      onClose={onClose}
      // Clicking the backdrop (the dialog element itself, outside the panel) closes it.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="drawer bg-background text-foreground"
    >
      <div className="flex h-full flex-col overflow-y-auto px-gutter pb-10">
        <div className="flex h-(--header-h) shrink-0 items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-12 items-center justify-center rounded-full bg-foreground text-background transition-opacity duration-300 ease-atelier hover:opacity-80"
          >
            <CloseIcon />
          </button>
        </div>

        <form action="/search" role="search" className="mt-4 flex items-center gap-3 border-b border-line-strong pb-2">
          <SearchIcon className="shrink-0 text-muted" />
          <label htmlFor="menu-search" className="sr-only">
            Search
          </label>
          <input
            id="menu-search"
            name="q"
            type="search"
            placeholder="Search for products"
            className="w-full bg-transparent py-2 text-body outline-none"
          />
        </form>

        <nav aria-label="Main" className="mt-10">
          <ul className="flex flex-col gap-1">
            {navigation.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2 text-title transition-opacity duration-300 ease-atelier hover:opacity-60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-auto flex flex-col gap-4 border-t border-line pt-8 text-ui">
          {navigation.secondary.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={onClose} className="link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
