import { customerIds } from "../customers/customer.mock.ids";
import type { Order } from "./order.model";

export const mockOrders: Order[] = [
  {
    id: "order-0001",
    customerId: customerIds.fran,
    paymentMethod: { type: "Amex", last4: "1234" },
    currency: "USD",
    totalAmount: 78.10,
    status: "Completed",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    orderNumber: "ORD-1001",
    issueDate: new Date("2026-03-24T19:26:34.456Z")
  },
  {
    id: "order-0002",
    customerId: customerIds.penjani,
    paymentMethod: { type: "ApplePay" },
    currency: "USD",
    totalAmount: 110.39,
    status: "Completed",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    orderNumber: "ORD-1002",
    issueDate: new Date("2026-03-24T19:26:34.456Z")
  },
  {
    id: "order-0003",
    customerId: customerIds.carson,
    paymentMethod: { type: "Visa", last4: "5678" },
    currency: "USD",
    totalAmount: 25.58,
    status: "Completed",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    orderNumber: "ORD-1003",
    issueDate: new Date("2026-03-24T19:26:34.456Z")
  },
  {
    id: "order-0004",
    customerId: customerIds.siegbert,
    paymentMethod: { type: "GooglePay" },
    currency: "USD",
    totalAmount: 89.41,
    status: "Completed",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    orderNumber: "ORD-1004",
    issueDate: new Date("2026-03-24T19:26:34.456Z")
  },
  {
    id: "order-0005",
    customerId: customerIds.miron,
    paymentMethod: { type: "Amex", last4: "1234" },
    currency: "USD",
    totalAmount: 19.99,
    status: "Completed",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    orderNumber: "ORD-1005",
    issueDate: new Date("2026-03-24T19:26:34.456Z")
  },
  {
    id: "order-0006",
    customerId: customerIds.fran,
    paymentMethod: { type: "Amex", last4: "1234" },
    currency: "USD",
    totalAmount: 99.10,
    status: "Completed",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    orderNumber: "ORD-1006",
    issueDate: new Date("2026-03-24T19:26:34.456Z")
  },
  {
    id: "order-0007",
    customerId: customerIds.fran,
    paymentMethod: { type: "Amex", last4: "1234" },
    currency: "USD",
    totalAmount: 50.00,
    status: "Pending",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    orderNumber: "ORD-1007",
    issueDate: new Date("2026-03-24T19:26:34.456Z")
  },
];
