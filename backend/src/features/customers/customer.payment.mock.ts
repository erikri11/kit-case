import type { CustomerPayment } from "./customer.payment.model";

export const customerPaymentsMock: CustomerPayment[] = [
  {
    id: "pay-001",
    customerId: "1",
    currency: "USD",
    amount: 500,
    invoiceId: "INV-001",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: "pay-002",
    customerId: "1",
    currency: "USD",
    amount: 250,
    invoiceId: "INV-002",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "pay-003",
    customerId: "1",
    currency: "USD",
    amount: 120,
    invoiceId: "INV-003",
    status: "refunded",
    createdAt: new Date(),
  },
  {
    id: "pay-004",
    customerId: "2",
    currency: "EUR",
    amount: 820,
    invoiceId: "INV-004",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: "pay-005",
    customerId: "3",
    currency: "USD",
    amount: 1200,
    invoiceId: "INV-005",
    status: "completed",
    createdAt: new Date(),
  },
];
