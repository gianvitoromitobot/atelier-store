import { ProductCard } from "@/components/product/product-card";
import { ProductRail, ProductRailItem } from "@/components/product/product-rail";
import { Section } from "@/components/ui";
import { finishingTouchSlugs } from "@/lib/catalog";
import { getProductsBySlugs } from "@/lib/products";
import { SectionHeading } from "./section-heading";

export async function FinishingTouches() {
  const products = await getProductsBySlugs(finishingTouchSlugs);
  if (products.length === 0) return null;

  return (
    <Section aria-labelledby="finishing-title">
      <SectionHeading
        id="finishing-title"
        eyebrow="Accessories"
        title="Finishing touches"
        link={{ label: "Shop accessories", href: "/collections/accessories" }}
      />
      <ProductRail label="Accessories">
        {products.map((p) => (
          <ProductRailItem key={p.slug}>
            <ProductCard product={p} sizes="(min-width: 64rem) 23vw, (min-width: 48rem) 31vw, (min-width: 30rem) 45vw, 72vw" />
          </ProductRailItem>
        ))}
      </ProductRail>
    </Section>
  );
}
