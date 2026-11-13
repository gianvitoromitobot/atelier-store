import Image from "next/image";
import Link from "next/link";
import { Media } from "@/components/ui";
import type { CatalogProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: CatalogProduct;
  /** `sizes` for the image; defaults to the 2 → 3 → 4 column product grid. */
  sizes?: string;
};

export function ProductCard({
  product,
  sizes = "(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw",
}: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block bg-background">
      <Media ratio="square">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-atelier group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-background px-2 py-0.5 text-caption font-medium">
            {product.badge}
          </span>
        )}
      </Media>
      <div className="flex flex-col gap-0.5 px-3 pt-3 pb-6 lg:px-4">
        <p className="text-caption text-muted">{product.category}</p>
        <h3 className="text-ui">{product.name}</h3>
        <p className="text-ui font-medium">{formatPrice(product.priceCents, product.currency)}</p>
      </div>
    </Link>
  );
}
