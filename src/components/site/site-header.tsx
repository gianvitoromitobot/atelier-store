"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";
import { navigation } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { MenuDrawer } from "./menu-drawer";
import { Wordmark } from "./wordmark";

/** Routes whose first block is full-bleed media: the header starts transparent with white content over it. */
const OVERLAY_ROUTES = new Set(["/"]);

const iconButton =
  "inline-flex size-10 items-center justify-center rounded-full transition-opacity duration-300 ease-atelier hover:opacity-60";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = OVERLAY_ROUTES.has(pathname) && !scrolled && !menuOpen;

  return (
    <header
      data-overlay={overlay || undefined}
      className={cn(
        "sticky top-0 z-40 h-(--header-h) border-b transition-colors duration-500 ease-atelier",
        overlay
          ? "border-transparent bg-transparent text-white"
          : "border-line bg-background text-foreground",
      )}
    >
      <div className="container-page grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="-ms-2 inline-flex h-10 items-center gap-2 px-2 transition-opacity duration-300 ease-atelier hover:opacity-60"
          >
            <MenuIcon />
            <span className="eyebrow max-sm:sr-only">Menu</span>
          </button>
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-6 text-ui">
              {navigation.primary.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link decoration-transparent hover:decoration-current">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link href="/" aria-label="Atelier — home" className="justify-self-center">
          <Wordmark className="text-[1.375rem] lg:text-[1.75rem]" />
        </Link>

        <div className="-me-2 flex items-center justify-end gap-1">
          <Link href="/search" aria-label="Search" className={cn(iconButton, "max-sm:hidden")}>
            <SearchIcon />
          </Link>
          <Link href="/account" aria-label="Account" className={iconButton}>
            <UserIcon />
          </Link>
          <Link href="/bag" aria-label="Shopping bag, 0 items" className={iconButton}>
            <BagIcon />
          </Link>
        </div>
      </div>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
