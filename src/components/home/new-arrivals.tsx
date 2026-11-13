import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Grid, Section, gridSpan2 } from "@/components/ui";
import { editorialTile, newArrivalSlugs } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { getProductsBySlugs } from "@/lib/products";
import { SectionHeading } from "./section-heading";

/**
 * Product grid led by a two-column editorial tile. 1 tile (2 cells) + 10 products = 12 cells,
 * which fills complete rows at 2, 3 and 4 columns.
 */
export async function NewArrivals() {
  const products = await getProductsBySlugs(newArrivalSlugs);

  return (
    <Section aria-labelledby="new-arrivals-title">
      <SectionHeading
        id="new-arrivals-title"
        eyebrow="Just in"
        title="New arrivals"
        link={{ label: "View all", href: "/collections/new-in" }}
      />
      <Grid variant="product">
        <Link
          href={`/collections/${editorialTile.slug}`}
          className={cn(gridSpan2, "group relative block aspect-[4/3] overflow-hidden bg-media text-white md:aspect-auto")}
        >
          <Image
            src={editorialTile.image.src}
            alt={editorialTile.image.alt}
            fill
            sizes="(min-width: 64rem) 50vw, (min-width: 48rem) 67vw, 100vw"
            className="object-cover transition-transform duration-700 ease-atelier group-hover:scale-[1.03]"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-5 lg:p-8">
            <p className="eyebrow">{editorialTile.eyebrow}</p>
            <h3 className="text-title">{editorialTile.title}</h3>
            <span className="link mt-1 text-ui">Discover</span>
          </div>
        </Link>
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </Grid>
    </Section>
  );
}
