import type { Order } from "../features/orders/order.model";

export function calculateOrderSummary(orders: Order[]) {
  const totalOrders = orders.length;

  const ordersValue = orders
    .filter((order) => order.status === "Completed")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  return {
    totalOrders,
    ordersValue
  };
}
