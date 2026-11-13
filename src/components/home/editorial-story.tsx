import Image from "next/image";
import { ButtonLink, Media, Section } from "@/components/ui";
import { story } from "@/lib/catalog";

/** Image + statement split on the soft surface: landscape image on top on phones, side by side from lg. */
export function EditorialStory() {
  return (
    <Section tone="surface" spacing="none" aria-labelledby="story-title">
      <div className="grid lg:grid-cols-2">
        <Media ratio="landscape" className="lg:aspect-auto lg:min-h-[40rem]">
          <Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width: 64rem) 50vw, 100vw" className="object-cover" />
        </Media>
        <div className="flex flex-col items-start justify-center gap-6 px-gutter py-section lg:px-16 xl:px-24">
          <p className="eyebrow text-muted">{story.eyebrow}</p>
          <h2 id="story-title" className="font-display text-display">
            {story.title}
          </h2>
          <p className="max-w-md text-lead text-muted">{story.body}</p>
          <ButtonLink href={story.cta.href} variant="secondary" className="mt-2">
            {story.cta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
