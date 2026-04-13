import { Currency } from "../products/product.model";

export interface CustomerPaymentSummary {
  totalOrders: number;
  ordersValueBase: number;
  refundsValueBase: number;
  baseCurrency: Currency;
}
