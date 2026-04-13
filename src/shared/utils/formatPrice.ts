import type { Currency } from "@features/products/models/product.constants";
import { convertToBaseCurrency } from "./convertToBaseCurrency";
import { formatCurrency } from "./formatCurrency";

export function formatPrice(
  value: number | undefined | null,
  originalCurrency: Currency,
  displayCurrency: Currency,
  language?: string
): string {
  
  if (value == null) return "-";

  const converted = convertToBaseCurrency(
    value,
    originalCurrency,
    displayCurrency
  );

  return formatCurrency(converted, displayCurrency, language);
}
