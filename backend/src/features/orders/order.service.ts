import { v4 as uuidv4 } from "uuid";
import type { Order } from "./order.model";
import { mockOrders } from "./order.mock";
import { generateOrderNumber } from "../../utils/generateOrderNumber";

let orders: Order[] = [...mockOrders];

export function listOrders(): Order[] {
  return orders;
}

export function getOrder(id: string): Order | null {
  return orders.find((x) => x.id === id) ?? null;
}

export function createOrder(input: {
  name: Order["name"];
  email: Order["email"];
  avatar?: Order["avatar"];
  paymentMethod: Order["paymentMethod"];
  currency: Order["currency"];
  totalAmount: Order["totalAmount"];
  status: Order["status"];
  issueDate: Order["issueDate"];
}): Order {
  
  const {
    name,
    email,
    avatar,
    paymentMethod,
    currency,
    totalAmount,
    status,
    issueDate
  } = input;

  const order: Order = {
    id: uuidv4(),
    name,
    email,
    avatar,
    paymentMethod,
    currency,
    totalAmount,
    status,
    createdAt: new Date(),
    orderNumber: generateOrderNumber(),
    issueDate: new Date(issueDate)
  };

  orders.unshift(order);

  return order;
}

export function updateOrder(
  id: string,
  input: Partial<{
    name: Order["name"];
    email: Order["email"];
    avatar?: Order["avatar"];
    paymentMethod: Order["paymentMethod"];
    currency: Order["currency"];
    totalAmount: Order["totalAmount"];
    status: Order["status"];
    issueDate: Order["issueDate"];
  }>
): Order | null {
  const index = orders.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const updatedOrder: Order = {
    ...orders[index],
    ...input,
    issueDate: input.issueDate ? new Date(input.issueDate) : orders[index].issueDate
  };

  orders[index] = updatedOrder;

  return updatedOrder;
}

export function deleteOrder(id: string): boolean {
  const before = orders.length;
  orders = orders.filter((x) => x.id !== id);
  return orders.length !== before;
}