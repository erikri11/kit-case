import type { Currency } from "@features/products/models/product.constants";

const EXCHANGE_RATES_TO_NOK: Record<Currency, number> = {
  NOK: 1,
  USD: 10.8
};

export function convertToBaseCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  if (fromCurrency === toCurrency) return amount;

  const amountInNok = amount * EXCHANGE_RATES_TO_NOK[fromCurrency];

  return amountInNok / EXCHANGE_RATES_TO_NOK[toCurrency];
}
