/**
 * Idempotent catalogue seed: upserts categories and products by slug.
 * Run with `pnpm db:seed`. Uses its own client because `src/db/index.ts` imports `server-only`.
 */
import { neon } from "@neondatabase/serverless";
import { getTableColumns, sql, type SQL } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import type { PgTable } from "drizzle-orm/pg-core";
import * as schema from "./schema";
import { category, product } from "./schema";
import { seedCategories, seedProducts } from "./seed-data";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local.");
}

const db = drizzle({ client: neon(process.env.DATABASE_URL), schema });

/** `SET col = excluded.col` for the given columns of an upsert. */
function excluded<T extends PgTable>(table: T, keys: (keyof T["$inferInsert"] & string)[]) {
  const columns = getTableColumns(table);
  return Object.fromEntries(
    keys.map((key) => [key, sql.raw(`excluded."${columns[key].name}"`)]),
  ) as Record<string, SQL>;
}

async function main() {
  const upsertCategories = db
    .insert(category)
    .values(
      seedCategories.map((c) => ({
        slug: c.slug,
        name: c.name,
        imageUrl: c.image?.src ?? null,
        imageAlt: c.image?.alt ?? null,
        featured: c.featured ?? false,
        position: c.position ?? 0,
      })),
    )
    .onConflictDoUpdate({
      target: category.slug,
      set: {
        ...excluded(category, ["name", "imageUrl", "imageAlt", "featured", "position"]),
        updatedAt: sql`now()`,
      },
    });

  const upsertProducts = db
    .insert(product)
    .values(
      seedProducts.map((p) => ({
        slug: p.slug,
        name: p.name,
        description: p.description,
        // Resolved in SQL so both statements can run in one atomic batch.
        categoryId: sql`(select ${category.id} from ${category} where ${category.slug} = ${p.categorySlug})`,
        priceCents: p.priceCents,
        currency: p.currency,
        imageUrl: p.image.src,
        imageAlt: p.image.alt,
        badge: p.badge ?? null,
        details: p.details,
        stock: p.stock,
      })),
    )
    .onConflictDoUpdate({
      target: product.slug,
      set: {
        ...excluded(product, [
          "name",
          "description",
          "categoryId",
          "priceCents",
          "currency",
          "imageUrl",
          "imageAlt",
          "badge",
          "details",
          "stock",
        ]),
        updatedAt: sql`now()`,
      },
    });

  await db.batch([upsertCategories, upsertProducts]);

  console.log(`Seeded ${seedCategories.length} categories and ${seedProducts.length} products.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
