import Image from "next/image";
import { Media } from "@/components/ui";
import type { Img } from "@/lib/catalog";
import { cn } from "@/lib/cn";

type ProductGalleryProps = {
  images: Img[];
  /** Product name, used to label the gallery region. */
  name: string;
};

/**
 * PDP imagery. Phones: full-bleed, swipeable snap row (one image per screen).
 * lg+: images stacked edge-to-edge in the left column with 1px gaps, so the info column can stay sticky beside them.
 */
export function ProductGallery({ images, name }: ProductGalleryProps) {
  const multiple = images.length > 1;

  return (
    <ul
      aria-label={`${name} images`}
      tabIndex={multiple ? 0 : undefined}
      className={cn(
        "flex gap-px",
        multiple && "scrollbar-none snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
        "lg:flex-col lg:overflow-visible",
      )}
    >
      {images.map((img, i) => (
        <li key={img.src} className="w-full shrink-0 snap-start">
          <Media ratio="square" className="lg:aspect-[4/5]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 64rem) 58vw, 100vw"
              className="object-cover"
            />
          </Media>
        </li>
      ))}
    </ul>
  );
}
