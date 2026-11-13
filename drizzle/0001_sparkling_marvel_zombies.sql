CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"image_url" text,
	"image_alt" text,
	"featured" boolean DEFAULT false NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "image_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "category_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "image_alt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "badge" text;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "details" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "stock" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_category_id_idx" ON "product" USING btree ("category_id");--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_stock_non_negative" CHECK ("product"."stock" >= 0);--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_price_non_negative" CHECK ("product"."price_cents" >= 0);