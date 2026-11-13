import Image from "next/image";
import Link from "next/link";
import { Media, Section } from "@/components/ui";
import { getFeaturedCategories } from "@/lib/products";
import { SectionHeading } from "./section-heading";

export async function CategoryTiles() {
  const categories = await getFeaturedCategories();
  if (categories.length === 0) return null;

  return (
    // Follows the product grid directly, so only bottom rhythm here.
    <Section spacing="none" className="pb-section" aria-labelledby="categories-title">
      <SectionHeading id="categories-title" eyebrow="Explore" title="Shop by category" />
      <ul className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/collections/${c.slug}`} className="group block">
              <Media ratio="portrait">
                <Image
                  src={c.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-atelier group-hover:scale-[1.04]"
                />
              </Media>
              <div className="flex items-center justify-between gap-3 px-3 pt-3 pb-2 lg:px-4">
                <h3 className="text-ui font-medium">{c.title}</h3>
                <span className="link text-caption text-muted" aria-hidden>
                  Shop
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
