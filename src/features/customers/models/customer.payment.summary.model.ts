import type { Currency } from "@features/products/models/product.constants";

export interface CustomerPaymentSummary {
  totalOrders: number;
  ordersValueBase: number;
  refundsValueBase: number;
  baseCurrency: Currency;
}
