import Image from "next/image";
import { ButtonLink, Grid, Media } from "@/components/ui";
import { hero } from "@/lib/catalog";

/**
 * Full-viewport campaign: one image on phones, a 50/50 diptych from md.
 * Pulled up under the sticky header (which renders transparent/white over it on this route).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-(--header-h) text-white">
      <Grid variant="split">
        {hero.images.map((img, i) => (
          <Media key={img.src} ratio="screen" scrim className={i > 0 ? "max-md:hidden" : undefined}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              preload={i === 0}
              sizes="(min-width: 48rem) 50vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </Media>
        ))}
      </Grid>

      {/* Top scrim keeps the transparent header legible over bright skies. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/35 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 container-page flex flex-col items-center gap-5 pb-14 text-center lg:pb-20">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className="font-display text-display">
          {hero.title}
        </h1>
        <ButtonLink href={hero.cta.href} variant="overlay" className="mt-2">
          {hero.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
