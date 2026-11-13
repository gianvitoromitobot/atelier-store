import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: "Atelier Store", template: "%s · Atelier Store" },
  description: "Considered wardrobe pieces, bags and jewellery, made in small runs by independent ateliers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="eyebrow sr-only z-50 bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <p className="bg-surface px-gutter py-2.5 text-center text-caption">
          Complimentary express shipping and returns on every order
        </p>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
