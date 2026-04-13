import { v4 as uuidv4 } from "uuid";
import type { Order, OrderCreate, OrderUpdate } from "./order.model";
import type { OrderDetails } from "./order.details.model";
import { mockOrders } from "./order.mock";
import { generateOrderNumber } from "../../utils/generateOrderNumber";
import { listCustomers } from "../customers/customer.service";
import { createCustomerPayment, hasPaymentForInvoice, updatePaymentStatusByInvoice } from "../customers/customer.payment.service";
import { Currency } from "../products/product.model";
import { convertToBaseCurrency } from "../../utils/convertToBaseCurrency";

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
      avatar: customer.avatar,
      status: customer.status
    }
  };
}

function syncPaymentWithOrder(order: Order) {
  const paymentExists = hasPaymentForInvoice(order.orderNumber);

  if (order.status === "Completed" && !paymentExists) {
    createCustomerPayment({
      customerId: order.customerId,
      currency: order.currency,
      amount: order.totalAmount,
      invoiceId: order.orderNumber,
      status: "Completed",
      createdAt: order.createdAt
    });
    return;
  }

  if (order.status === "Refunded" && paymentExists) {
    updatePaymentStatusByInvoice(order.orderNumber, "Refunded");
    return;
  }

  if (order.status === "Completed" && paymentExists) {
    updatePaymentStatusByInvoice(order.orderNumber, "Completed");
  }
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
  const baseCurrency: Currency = "NOK";
  
  const totalAmount = input.lineItems.reduce((sum, item) => {
    return sum + convertToBaseCurrency(
      item.totalAmount,
      item.currency,
      baseCurrency
    );
  }, 0);

  const order: Order = {
    id: uuidv4(),
    customerId: input.customerId,
    paymentMethod: input.paymentMethod,
    currency: baseCurrency,
    totalAmount,
    status: "Pending",
    createdAt: new Date(),
    orderNumber: generateOrderNumber(),
    issueDate: new Date(input.issueDate),
    lineItems: input.lineItems
  };

  orders.unshift(order);

  syncPaymentWithOrder(order);

  return mapOrderToDetails(order);
}

export function updateOrder(id: string, input: OrderUpdate): OrderDetails | null {
  const index = orders.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const baseCurrency: Currency = "NOK";

  const totalAmount = input.lineItems.reduce((sum, item) => {
    return sum + convertToBaseCurrency(
      item.totalAmount,
      item.currency,
      baseCurrency
    );
  }, 0);

  const updatedOrder: Order = {
    ...orders[index],
    customerId: input.customerId,
    paymentMethod: input.paymentMethod,
    status: input.status,
    issueDate: new Date(input.issueDate),
    lineItems: input.lineItems,
    totalAmount,
    currency: baseCurrency
  };

  orders[index] = updatedOrder;

  syncPaymentWithOrder(updatedOrder);

  return mapOrderToDetails(updatedOrder);
}

export function deleteOrder(id: string): boolean {
  const before = orders.length;
  orders = orders.filter((x) => x.id !== id);
  return orders.length !== before;
}
