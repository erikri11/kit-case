import { v4 as uuidv4 } from "uuid";
import type { Order, OrderCreate, OrderUpdate } from "./order.model";
import { mockOrders } from "./order.mock";
import { generateOrderNumber } from "../../utils/generateOrderNumber";
import { OrderDetails } from "./order.details.model";
import { listCustomers } from "../customers/customer.service";

let orders: Order[] = [...mockOrders];

function mapOrderToDetails(order: Order): OrderDetails | null {
  const customer = listCustomers().find((item) => item.id === order.customerId);

  if (!customer) return null;

  return {
    ...order,
    customer: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      avatar: customer.avatar
    }
  };
}

export function listOrders(): OrderDetails[] {
  return orders
    .map(mapOrderToDetails)
    .filter((x): x is OrderDetails => x !== null);
}

export function getOrder(id: string): OrderDetails | null {
  const order = orders.find((x) => x.id === id);
  if (!order) return null;

  return mapOrderToDetails(order);
}

export function createOrder(input: OrderCreate): OrderDetails | null {
  const order: Order = {
    id: uuidv4(),
    customerId: input.customerId,
    paymentMethod: input.paymentMethod,
    currency: input.currency,
    totalAmount: input.totalAmount,
    status: input.status,
    createdAt: new Date(),
    orderNumber: generateOrderNumber(),
    issueDate: new Date(input.issueDate)
  };

  orders.unshift(order);

  return mapOrderToDetails(order);
}

export function updateOrder(id: string, input: OrderUpdate): OrderDetails | null {
  const index = orders.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const updatedOrder: Order = {
    ...orders[index],
    customerId: input.customerId,
    paymentMethod: input.paymentMethod,
    status: input.status,
    issueDate: new Date(input.issueDate)
  };

  orders[index] = updatedOrder;

  return mapOrderToDetails(updatedOrder);
}

export function deleteOrder(id: string): boolean {
  const before = orders.length;
  orders = orders.filter((x) => x.id !== id);
  return orders.length !== before;
}
