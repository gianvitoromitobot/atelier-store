import "server-only";
import { and, asc, desc, eq, inArray, isNotNull, ne, sql } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { db } from "@/db";
import { category, product, type Category, type Product } from "@/db/schema";
import type { CatalogProduct, Collection, ProductDetail } from "@/lib/catalog";

/**
 * Product/category data layer: the only place the storefront queries the catalogue.
 * Results are cached (Cache Components) under the `catalog` tag; call `revalidateTag(CATALOG_TAG)`
 * (or `updateTag` from a Server Function) after writing products, categories or stock.
 */
export const CATALOG_TAG = "catalog";

type Row = { product: Product; category: Category };

function toCatalogProduct({ product: p, category: c }: Row): CatalogProduct {
  return {
    slug: p.slug,
    name: p.name,
    category: c.name,
    categorySlug: c.slug,
    priceCents: p.priceCents,
    currency: p.currency,
    image: { src: p.imageUrl, alt: p.imageAlt },
    badge: p.badge ?? undefined,
  };
}

function toProductDetail(row: Row): ProductDetail {
  const base = toCatalogProduct(row);
  return {
    ...base,
    description: row.product.description ?? "",
    details: row.product.details,
    stock: row.product.stock,
    images: [base.image],
  };
}

/** Product rows joined with their category; callers add the `active` filter. */
const productsWithCategory = () =>
  db.select({ product, category }).from(product).innerJoin(category, eq(product.categoryId, category.id));

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheTag(CATALOG_TAG);
  const rows = await db.select({ slug: product.slug }).from(product).where(eq(product.active, true));
  return rows.map((r) => r.slug);
}

export async function getProduct(slug: string): Promise<ProductDetail | undefined> {
  "use cache";
  cacheTag(CATALOG_TAG);
  const [row] = await productsWithCategory()
    .where(and(eq(product.slug, slug), eq(product.active, true)))
    .limit(1);
  return row ? toProductDetail(row) : undefined;
}

/** Active products for the given slugs, in the order given (curated homepage rails). Unknown slugs are skipped. */
export async function getProductsBySlugs(slugs: string[]): Promise<CatalogProduct[]> {
  "use cache";
  cacheTag(CATALOG_TAG);
  if (slugs.length === 0) return [];
  const rows = await productsWithCategory().where(and(inArray(product.slug, slugs), eq(product.active, true)));
  const bySlug = new Map(rows.map((r) => [r.product.slug, toCatalogProduct(r)]));
  return slugs.flatMap((s) => bySlug.get(s) ?? []);
}

/** Same-category products first, then the rest of the catalogue, excluding the product itself. */
export async function getRelatedProducts(slug: string, categorySlug: string, limit = 8): Promise<CatalogProduct[]> {
  "use cache";
  cacheTag(CATALOG_TAG);
  const rows = await productsWithCategory()
    .where(and(ne(product.slug, slug), eq(product.active, true)))
    .orderBy(desc(sql`${category.slug} = ${categorySlug}`), asc(product.createdAt), asc(product.slug))
    .limit(limit);
  return rows.map(toCatalogProduct);
}

/** Categories shown in "Shop by category", in tile order. */
export async function getFeaturedCategories(): Promise<Collection[]> {
  "use cache";
  cacheTag(CATALOG_TAG);
  const rows = await db
    .select()
    .from(category)
    // A tile needs an image, so featured categories without one are skipped.
    .where(and(eq(category.featured, true), isNotNull(category.imageUrl)))
    .orderBy(asc(category.position), asc(category.name));
  return rows.map((c) => ({
    slug: c.slug,
    title: c.name,
    image: { src: c.imageUrl!, alt: c.imageAlt ?? "" },
  }));
}
