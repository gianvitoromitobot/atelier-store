import { Container, Grid, Section, TextLink } from "@/components/ui";
import { services } from "@/lib/catalog";

export function Services() {
  return (
    <Section tone="surface" aria-labelledby="services-title">
      <Container>
        <h2 id="services-title" className="eyebrow text-muted">
          Atelier services
        </h2>
        <Grid variant="cards" className="mt-8">
          {services.map((s) => (
            <div key={s.title} className="flex flex-col items-start gap-3 border-t border-line pt-6">
              <h3 className="text-lead font-medium">{s.title}</h3>
              <p className="text-body text-muted">{s.body}</p>
              <TextLink href={s.link.href} className="mt-1 text-ui">
                {s.link.label}
              </TextLink>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
