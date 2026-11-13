import { Container, Section, TextLink } from "@/components/ui";

export function Intro() {
  return (
    <Section>
      <Container size="narrow" className="flex flex-col items-center gap-6 text-center">
        <p className="eyebrow text-muted">The house</p>
        <p className="font-display text-title">
          Considered wardrobe pieces, made in small runs by independent ateliers and designed to be worn for
          decades, not seasons.
        </p>
        <TextLink href="/collections/new-in" className="text-ui">
          Explore what&apos;s new
        </TextLink>
      </Container>
    </Section>
  );
}
