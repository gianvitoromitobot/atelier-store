import { Container, TextLink } from "@/components/ui";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  link?: { label: string; href: string };
};

/** Title row above full-bleed grids and rails: eyebrow + title left, "View all" link right. */
export function SectionHeading({ id, eyebrow, title, link }: SectionHeadingProps) {
  return (
    <Container className="mb-8 flex items-end justify-between gap-6 lg:mb-10">
      <div>
        {eyebrow && <p className="eyebrow text-muted">{eyebrow}</p>}
        <h2 id={id} className="mt-3 text-title">
          {title}
        </h2>
      </div>
      {link && (
        <TextLink href={link.href} className="shrink-0 text-ui">
          {link.label}
        </TextLink>
      )}
    </Container>
  );
}
