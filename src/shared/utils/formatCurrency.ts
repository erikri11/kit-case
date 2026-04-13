import type { Currency } from "@features/products/models/product.constants";

const currencySymbolMap: Record<Currency, string> = {
  USD: "$",
  NOK: "kr"
};

export function formatCurrency(
  value: number | undefined | null,
  currency: Currency,
  locale?: string
): string {
  if (value == null) return "-";

  const formattedNumber = new Intl.NumberFormat(locale ?? undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

  const symbol = currencySymbolMap[currency];

  if (currency === "NOK") {
    return `${symbol} ${formattedNumber}`;
  }

  return `${symbol}${formattedNumber}`;
}