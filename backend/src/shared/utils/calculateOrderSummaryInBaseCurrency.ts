import { Currency } from "../../features/products/product.model";
import { convertToBaseCurrency } from "./convertToBaseCurrency";

interface OrderLike {
  totalAmount: number;
  currency: Currency;
}

export function calculateOrderSummaryInBaseCurrency(
  orders: OrderLike[],
  baseCurrency: Currency = "NOK"
) {
  const totalOrders = orders.length;

  const ordersValueBase = orders.reduce((sum, order) => {
    return sum + convertToBaseCurrency(order.totalAmount, order.currency, baseCurrency);
  }, 0);

  return {
    totalOrders,
    ordersValueBase,
    baseCurrency
  };
}
