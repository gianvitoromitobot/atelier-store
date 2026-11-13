/** Format integer minor units (e.g. cents) as a localized price. Whole amounts drop the decimals. */
export function formatPrice(priceCents: number, currency: string, locale = "en-US") {
  const whole = priceCents % 100 === 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(priceCents / 100);
}
