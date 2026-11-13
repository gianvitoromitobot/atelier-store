import type { ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { Button, TextLink } from "@/components/ui";
import { services, stockState, type ProductDetail } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { StockStatus } from "./stock-status";

/** Right-hand PDP column: breadcrumb, category, name, price, availability, action and detail accordions. */
export function ProductInfo({ product }: { product: ProductDetail }) {
  const soldOut = stockState(product.stock) === "sold-out";
  const categoryHref = `/collections/${product.categorySlug}`;

  return (
    <div className="flex flex-col">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-caption text-muted">
          <li>
            <TextLink href="/" tone="muted" className="decoration-transparent hover:decoration-current">
              Home
            </TextLink>
          </li>
          <li aria-hidden>/</li>
          <li>
            <TextLink href={categoryHref} tone="muted" className="decoration-transparent hover:decoration-current">
              {product.category}
            </TextLink>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-foreground">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-8 flex items-center gap-3 lg:mt-12">
        <p className="eyebrow text-muted">{product.category}</p>
        {product.badge && <span className="bg-surface px-2 py-0.5 text-caption font-medium">{product.badge}</span>}
      </div>
      <h1 className="mt-3 text-lead">{product.name}</h1>
      <p className="mt-1 text-lead font-medium">{formatPrice(product.priceCents, product.currency)}</p>

      <StockStatus stock={product.stock} className="mt-6" />

      <div className="mt-4">
        {soldOut ? (
          <Button fullWidth disabled>
            Sold out
          </Button>
        ) : (
          <Button fullWidth>Add to bag</Button>
        )}
      </div>

      {product.description && <p className="mt-8 text-body">{product.description}</p>}

      <div className="mt-8 border-b border-line">
        {product.details.length > 0 && (
          <Disclosure title="Details" defaultOpen>
            <ul className="flex flex-col gap-1">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Disclosure>
        )}
        {services.slice(0, 2).map((s) => (
          <Disclosure key={s.title} title={s.title}>
            <p>{s.body}</p>
            <TextLink href={s.link.href} className="mt-3 inline-block">
              {s.link.label}
            </TextLink>
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

function Disclosure({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details open={defaultOpen} className="group border-t border-line">
      <summary className="flex h-14 cursor-pointer list-none items-center justify-between gap-4 text-ui font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronRightIcon className="size-4 transition-transform duration-300 ease-atelier group-open:rotate-90" />
      </summary>
      <div className="pb-6 text-ui text-muted">{children}</div>
    </details>
  );
}
