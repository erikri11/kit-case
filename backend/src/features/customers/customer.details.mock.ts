import { calculatePaymentSummary } from "../../utils/calculatePaymentSummary";
import type { CustomerDetails } from "./customer.details.model";
import { customerIds } from "./customer.mock.ids";
import { CustomerPayment } from "./customer.payment.model";

const penjaniPayments: CustomerPayment[] = [
  {
    id: "pay-001",
    customerId: customerIds.penjani,
    currency: "USD",
    amount: 500,
    invoiceId: "INV-001",
    status: "Completed",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
  },
  {
    id: "pay-002",
    customerId: customerIds.penjani,
    currency: "USD",
    amount: 250,
    invoiceId: "INV-002",
    status: "Pending",
    createdAt: new Date("2026-03-25T20:31:32.456Z")
  },
  {
    id: "pay-003",
    customerId: customerIds.penjani,
    currency: "USD",
    amount: 120,
    invoiceId: "INV-003",
    status: "Refunded",
    createdAt: new Date("2026-03-26T21:32:33.456Z")
  }
];

const carsonPayments: CustomerPayment[] = [
  {
    id: "pay-004",
    customerId: customerIds.carson,
    currency: "EUR",
    amount: 820,
    invoiceId: "INV-004",
    status: "Completed",
    createdAt: new Date("2026-03-27T22:33:34.456Z")
  },
  {
    id: "pay-005",
    customerId: customerIds.carson,
    currency: "EUR",
    amount: 820,
    invoiceId: "INV-005",
    status: "Completed",
    createdAt: new Date("2026-03-28T23:34:35.456Z")
  },
  {
    id: "pay-006",
    customerId: customerIds.carson,
    currency: "EUR",
    amount: 540,
    invoiceId: "INV-006",
    status: "Refunded",
    createdAt: new Date("2026-03-29T00:35:36.456Z")
  },
  {
    id: "pay-007",
    customerId: customerIds.carson,
    currency: "EUR",
    amount: 255,
    invoiceId: "INV-007",
    status: "Pending",
    createdAt: new Date("2026-03-30T01:36:37.456Z")
  }
];

export const customerDetailsMock: CustomerDetails[] = [
  {
    id: customerIds.fran,
    name: "Fran Perez",
    avatar: "/avatar/avatar-5.png",
    email: "fran.perez@domain.com",
    phone: "(815) 704-0045",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    payments: [],
    paymentSummary: calculatePaymentSummary([])
  },
  {
    id: customerIds.penjani,
    name: "Penjani Inyene",
    avatar: "/avatar/avatar-4.png",
    email: "penjani.inyene@domain.com",
    phone: "(803) 937-8925",
    quota: 100,
    status: "Active",
    createdAt: new Date("2026-03-25T20:31:32.456Z"),
    payments: penjaniPayments,
    paymentSummary: calculatePaymentSummary(penjaniPayments)
  },
  {
    id: customerIds.carson,
    name: "Carson Darrin",
    avatar: "/avatar/avatar-3.png",
    email: "carson.darrin@domain.com",
    phone: "(715) 278-5041",
    quota: 50,
    status: "Blocked",
    createdAt: new Date("2026-03-26T21:32:33.456Z"),
    payments: carsonPayments,
    paymentSummary: calculatePaymentSummary(carsonPayments)
  },
  {
    id: customerIds.siegbert,
    name: "Siegbert Gottfried",
    avatar: "/avatar/avatar-2.png",
    email: "siegbert.gottfried@domain.com",
    phone: "(603) 766-0431",
    quota: 0,
    status: "Pending",
    createdAt: new Date("2026-03-27T22:33:34.456Z"),
    payments: [],
    paymentSummary: calculatePaymentSummary([])
  },
  {
    id: customerIds.miron,
    name: "Miron Vitold",
    avatar: "/avatar/avatar-1.png",
    email: "miron.vitold@domain.com",
    phone: "(425) 434-5535",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-03-28T23:34:35.456Z"),
    payments: [],
    paymentSummary: calculatePaymentSummary([])
  }
];
