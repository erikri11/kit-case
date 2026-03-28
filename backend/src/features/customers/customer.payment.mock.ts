import { customerIds } from "./customer.mock.ids";
import { CustomerPayment } from "./customer.payment.model";

export const franPayments: CustomerPayment[] = [
  {
    id: "pay-001",
    customerId: customerIds.fran,
    currency: "USD",
    amount: 78.10,
    invoiceId: "INV-001",
    status: "Completed",
    createdAt: new Date("2026-03-27T22:33:34.456Z")
  },
  {
    id: "pay-006",
    customerId: customerIds.fran,
    currency: "USD",
    amount: 99.10,
    invoiceId: "INV-006",
    status: "Completed",
    createdAt: new Date("2026-03-27T22:33:34.456Z")
  },
  {
    id: "pay-007",
    customerId: customerIds.fran,
    currency: "USD",
    amount: 50.00,
    invoiceId: "INV-007",
    status: "Refunded",
    createdAt: new Date("2026-03-27T22:33:34.456Z")
  }
];

export const penjaniPayments: CustomerPayment[] = [
  {
    id: "pay-002",
    customerId: customerIds.penjani,
    currency: "USD",
    amount: 110.39,
    invoiceId: "INV-002",
    status: "Completed",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
  }
];

export const carsonPayments: CustomerPayment[] = [
  {
    id: "pay-003",
    customerId: customerIds.carson,
    currency: "USD",
    amount: 25.58,
    invoiceId: "INV-003",
    status: "Completed",
    createdAt: new Date("2026-03-27T22:33:34.456Z")
  }
];

export const siegbertPayments: CustomerPayment[] = [
  {
    id: "pay-004",
    customerId: customerIds.siegbert,
    currency: "USD",
    amount: 25.58,
    invoiceId: "INV-004",
    status: "Completed",
    createdAt: new Date("2026-03-27T22:33:34.456Z")
  }
];

export const mironPayments: CustomerPayment[] = [
  {
    id: "pay-005",
    customerId: customerIds.miron,
    currency: "USD",
    amount: 19.99,
    invoiceId: "INV-005",
    status: "Completed",
    createdAt: new Date("2026-03-27T22:33:34.456Z")
  }
];
