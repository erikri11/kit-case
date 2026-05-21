import { Currency } from "../../features/products/product.model";
import { convertToBaseCurrency } from "./convertToBaseCurrency";

interface OrderLike {
  totalAmount: number;
  currency: Currency;
  status: string;
}

export function calculateOrderSummaryInBaseCurrency(
  orders: OrderLike[],
  baseCurrency: Currency = "NOK"
) {
  
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  );
  
  const totalOrders = completedOrders.length;

  const ordersValueBase = completedOrders.reduce((sum, order) => {
    return sum + convertToBaseCurrency(order.totalAmount, order.currency, baseCurrency);
  }, 0);

  return {
    totalOrders,
    ordersValueBase,
    baseCurrency
  };
}
