import Link from "next/link";
import { Container, Section, TextLink } from "@/components/ui";
import { footerColumns } from "@/lib/catalog";
import { NewsletterForm } from "./newsletter-form";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="tone-inverse">
      {/* Newsletter band */}
      <Section>
        <Container size="narrow" className="flex flex-col items-center gap-8 text-center">
          <p className="eyebrow text-muted">Newsletter</p>
          <p className="font-display text-title">
            Letters from the atelier: new collections, private previews and the people who make them.
          </p>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </Container>
      </Section>

      <Container className="grid grid-cols-1 gap-10 border-t border-line pt-12 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow text-muted">{col.title}</h2>
            <ul className="mt-5 flex flex-col gap-3 text-ui">
              {col.links.map((l) => (
                <li key={l.href}>
                  <TextLink href={l.href}>{l.label}</TextLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="eyebrow text-muted">Ship to</h2>
          <p className="mt-5 text-ui">
            United States (USD $) · <TextLink href="/locale">Change</TextLink>
          </p>
          <ul className="mt-6 flex gap-5 text-ui">
            <li>
              <TextLink href="https://instagram.com">Instagram</TextLink>
            </li>
            <li>
              <TextLink href="https://pinterest.com">Pinterest</TextLink>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="pb-6">
        <p className="border-t border-line pt-6 text-caption text-muted">
          © 2026 Atelier Store. Sample content for demonstration; photography via Unsplash.
        </p>
        <Link href="/" aria-label="Atelier — home" className="mt-8 block overflow-hidden text-center">
          <Wordmark className="block text-[12vw] xl:text-[11rem]" />
        </Link>
      </Container>
    </footer>
  );
}
