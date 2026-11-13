import Image from "next/image";
import Link from "next/link";
import { Grid, Media, buttonStyles } from "@/components/ui";
import { featuredCollections } from "@/lib/catalog";
import { cn } from "@/lib/cn";

/** Two 50/50 full-bleed collection panels; the whole panel is the link, the "button" is visual only. */
export function CollectionSplit() {
  return (
    <section aria-label="Featured collections">
      <Grid variant="split">
        {featuredCollections.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group relative block text-white">
            <Media ratio="portrait" scrim>
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="(min-width: 48rem) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-atelier group-hover:scale-[1.03]"
              />
            </Media>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-gutter pb-10 text-center lg:pb-14">
              {c.eyebrow && <p className="eyebrow">{c.eyebrow}</p>}
              <h2 className="font-display text-display">{c.title}</h2>
              <span className={cn(buttonStyles({ variant: "overlay", size: "sm" }), "group-hover:bg-white group-hover:text-black")}>
                Shop {c.title}
              </span>
            </div>
          </Link>
        ))}
      </Grid>
    </section>
  );
}
