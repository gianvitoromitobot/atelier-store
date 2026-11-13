import { stockState } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const copy = {
  "in-stock": { label: () => "In stock", dot: "bg-success", text: "" },
  "low-stock": { label: (n: number) => `Only ${n} left`, dot: "bg-danger", text: "text-danger" },
  "sold-out": { label: () => "Sold out", dot: "border border-muted", text: "text-muted" },
} as const;

/** Availability line: a small status dot and a label. Colour is backed by text, never the only signal. */
export function StockStatus({ stock, className }: { stock: number; className?: string }) {
  const state = copy[stockState(stock)];
  return (
    <p className={cn("flex items-center gap-2 text-ui", state.text, className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", state.dot)} />
      {state.label(stock)}
    </p>
  );
}
