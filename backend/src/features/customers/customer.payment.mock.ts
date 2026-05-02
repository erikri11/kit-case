import { customerIds } from "./customer.mock.ids";
import { CustomerPayment } from "./customer.payment.model";

export const franPayments: CustomerPayment[] = [
  {
    id: "pay-001",
    customerId: customerIds.fran,
    currency: "USD",
    amount: 466.00,
    invoiceId: "INV-001",
    status: "Pending",
    createdAt: new Date("2026-03-27T12:00:00")
  },
  {
    id: "pay-006",
    customerId: customerIds.fran,
    currency: "USD",
    amount: 466.00,
    invoiceId: "INV-006",
    status: "Pending",
    createdAt: new Date("2026-03-27T12:00:00")
  },
  {
    id: "pay-007",
    customerId: customerIds.fran,
    currency: "USD",
    amount: 466.00,
    invoiceId: "INV-007",
    status: "Pending",
    createdAt: new Date("2026-03-27T12:00:00")
  }
];

export const penjaniPayments: CustomerPayment[] = [
  {
    id: "pay-002",
    customerId: customerIds.penjani,
    currency: "USD",
    amount: 356.00,
    invoiceId: "INV-002",
    status: "Pending",
    createdAt: new Date("2026-03-24T12:00:00"),
  }
];

export const carsonPayments: CustomerPayment[] = [
  {
    id: "pay-003",
    customerId: customerIds.carson,
    currency: "USD",
    amount: 155.00,
    invoiceId: "INV-003",
    status: "Pending",
    createdAt: new Date("2026-03-27T12:00:00")
  }
];

export const siegbertPayments: CustomerPayment[] = [
  {
    id: "pay-004",
    customerId: customerIds.siegbert,
    currency: "USD",
    amount: 390.00,
    invoiceId: "INV-004",
    status: "Pending",
    createdAt: new Date("2026-03-27T12:00:00")
  }
];

export const mironPayments: CustomerPayment[] = [
  {
    id: "pay-005",
    customerId: customerIds.miron,
    currency: "USD",
    amount: 490.00,
    invoiceId: "INV-005",
    status: "Pending",
    createdAt: new Date("2026-03-27T12:00:00")
  }
];
