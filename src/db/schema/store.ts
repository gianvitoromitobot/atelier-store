import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  // Tile imagery; only categories shown on the homepage need one.
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  featured: boolean("featured").default(false).notNull(),
  position: integer("position").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const product = pgTable(
  "product",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "restrict" }),
    // Store money as integer minor units (e.g. cents) to avoid float rounding.
    priceCents: integer("price_cents").notNull(),
    currency: text("currency").default("usd").notNull(),
    imageUrl: text("image_url").notNull(),
    imageAlt: text("image_alt").notNull(),
    badge: text("badge"),
    // Bullet points for the PDP "Details" panel, in display order.
    details: text("details")
      .array()
      .default(sql`'{}'::text[]`)
      .notNull(),
    // Units available. Lives on the product until variants exist.
    stock: integer("stock").default(0).notNull(),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("product_category_id_idx").on(t.categoryId),
    check("product_stock_non_negative", sql`${t.stock} >= 0`),
    check("product_price_non_negative", sql`${t.priceCents} >= 0`),
  ],
);

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
}));

export const productRelations = relations(product, ({ one }) => ({
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
}));

export type Category = typeof category.$inferSelect;
export type NewCategory = typeof category.$inferInsert;
export type Product = typeof product.$inferSelect;
export type NewProduct = typeof product.$inferInsert;
