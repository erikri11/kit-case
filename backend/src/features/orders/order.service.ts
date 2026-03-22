import { v4 as uuidv4 } from "uuid";
import { Order } from "./order.model";
import { mockOrders } from "./order.mock";
import { generateOrderNumber } from "../../utils/generateOrderNumber";

let orders: Order[] = [...mockOrders];

export function listOrders(): Order[] {
  return orders;
};

export function getOrder(id: string): Order | null {
  return orders.find((x) => x.id === id) ?? null;
};

export function createOrder(input: {
  customer: Order["customer"];
  paymentMethod: string;
  currency: string;
  totalAmount: number;
  status: Order["status"];
}): Order {
  const { customer, paymentMethod, currency, totalAmount, status } = input;

  const order: Order = {
    id: uuidv4(),
    customer,
    paymentMethod,
    currency,
    totalAmount,
    status,
    createdAt: new Date(),
    orderNumber: generateOrderNumber()
  };

  orders.unshift(order);

  return order;
};

export function updateOrder(
  id: string,
  input: {
    customer: Order["customer"];
    paymentMethod: string;
    currency: string;
    totalAmount: number;
    status: Order["status"];
  }
): Order | null {

  const index = orders.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const { customer, paymentMethod, currency, totalAmount, status } = input;

  const updatedOrder: Order = {
    ...orders[index],
    customer,
    paymentMethod,
    currency,
    totalAmount,
    status
  };

  orders[index] = updatedOrder;

  return updatedOrder;
};

export function deleteOrder(id: string): boolean {
  const before = orders.length;
  orders = orders.filter((x) => x.id !== id);
  return orders.length !== before;
};
