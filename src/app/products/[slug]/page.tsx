import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductRail, ProductRailItem } from "@/components/product/product-rail";
import { Media, Section } from "@/components/ui";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/products";

type Params = PageProps<"/products/[slug]">["params"];

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.image.src, alt: product.image.alt }] },
  };
}

/**
 * The page shell never reads `params`; the product content does, inside Suspense, so client navigations
 * (with partial prefetching) can paint the skeleton instantly while the slug-specific content streams in.
 */
export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <main id="main" className="flex-1">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProductContent({ params }: { params: Params }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.slug, product.categorySlug);

  return (
    <>
      <ProductLayout
        gallery={<ProductGallery images={product.images} name={product.name} />}
        info={<ProductInfo product={product} />}
      />

      {related.length > 0 && (
        <Section aria-labelledby="related-title" className="border-t border-line">
          <SectionHeading id="related-title" eyebrow={product.category} title="You may also like" />
          <ProductRail label="You may also like">
            {related.map((p) => (
              <ProductRailItem key={p.slug}>
                <ProductCard
                  product={p}
                  sizes="(min-width: 64rem) 23vw, (min-width: 48rem) 31vw, (min-width: 30rem) 45vw, 72vw"
                />
              </ProductRailItem>
            ))}
          </ProductRail>
        </Section>
      )}
    </>
  );
}

/** Gallery left (7/12), sticky info column right (5/12) from lg; stacked on smaller screens. */
function ProductLayout({ gallery, info }: { gallery: React.ReactNode; info: React.ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-12">
      <div className="lg:col-span-7">{gallery}</div>
      <div className="lg:col-span-5">
        <div className="px-gutter pt-6 pb-12 lg:sticky lg:top-(--header-h) lg:px-16 lg:pt-8 xl:px-24">{info}</div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  const bar = "bg-surface";
  return (
    <div aria-busy="true" aria-label="Loading product">
      <ProductLayout
        gallery={<Media ratio="square" className="lg:aspect-[4/5]" />}
        info={
          <div className="flex flex-col">
            <div className={`h-4 w-48 ${bar}`} />
            <div className={`mt-8 h-4 w-20 lg:mt-12 ${bar}`} />
            <div className={`mt-3 h-7 w-2/3 ${bar}`} />
            <div className={`mt-1 h-7 w-24 ${bar}`} />
            <div className={`mt-6 h-5 w-28 ${bar}`} />
            <div className={`mt-4 h-12 w-full ${bar}`} />
            <div className={`mt-8 h-24 w-full ${bar}`} />
          </div>
        }
      />
    </div>
  );
}
