import type { Order } from "../features/orders/order.model";

export function calculateOrderSummary(orders: Order[]) {
  const totalOrders = orders.filter((order) => order.status === "Completed").length;

  const ordersValue = orders.reduce((sum, order) => {
    if (order.status === "Completed") {
      return sum + order.totalAmount;
    }

    return sum;
  }, 0);

  return {
    totalOrders,
    ordersValue
  };
}
