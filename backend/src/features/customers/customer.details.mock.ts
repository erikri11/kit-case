import type { CustomerDetails } from "./customer.details.model";
import { customerIds } from "./customer.mock.ids";
import { carsonPayments, franPayments, mironPayments, penjaniPayments, siegbertPayments } from "./customer.payment.mock";

export const customerDetailsMock: CustomerDetails[] = [
  {
    id: customerIds.fran,
    customerNumber: "CUST-0001",
    name: "Fran Perez",
    avatar: "/avatar/avatar-5.png",
    email: "fran.perez@domain.com",
    phone: "(815) 704-0045",
    company: "",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-03-24T19:26:34.456Z"),
    payments: franPayments,
    orders: [
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
    ],
    paymentSummary: {
      totalOrders: 3,
      ordersValue: 177.20,
      refundsValue: 0
    }
  },
  {
    id: customerIds.penjani,
    customerNumber: "CUST-0002",
    name: "Penjani Inyene",
    avatar: "/avatar/avatar-4.png",
    email: "penjani.inyene@domain.com",
    phone: "(803) 937-8925",
    company: "",
    quota: 100,
    status: "Active",
    createdAt: new Date("2026-03-25T20:31:32.456Z"),
    payments: penjaniPayments,
    orders: [
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
      }
    ],
    paymentSummary: {
      totalOrders: 1,
      ordersValue: 110.39,
      refundsValue: 0
    }
  },
  {
    id: customerIds.carson,
    customerNumber: "CUST-0003",
    name: "Carson Darrin",
    avatar: "/avatar/avatar-3.png",
    email: "carson.darrin@domain.com",
    phone: "(715) 278-5041",
    company: "",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-03-26T21:32:33.456Z"),
    payments: carsonPayments,
    orders: [
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
      }
    ],
    paymentSummary: {
      totalOrders: 1,
      ordersValue: 25.58,
      refundsValue: 0
    }
  },
  {
    id: customerIds.siegbert,
    customerNumber: "CUST-0004",
    name: "Siegbert Gottfried",
    avatar: "/avatar/avatar-2.png",
    email: "siegbert.gottfried@domain.com",
    phone: "(603) 766-0431",
    company: "",
    quota: 0,
    status: "Pending",
    createdAt: new Date("2026-03-27T22:33:34.456Z"),
    payments: siegbertPayments,
    orders: [
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
      }
    ],
    paymentSummary: {
      totalOrders: 1,
      ordersValue: 89.41,
      refundsValue: 0
    }
  },
  {
    id: customerIds.miron,
    customerNumber: "CUST-0005",
    name: "Miron Vitold",
    avatar: "/avatar/avatar-1.png",
    email: "miron.vitold@domain.com",
    phone: "(425) 434-5535",
    company: "",
    quota: 50,
    status: "Active",
    createdAt: new Date("2026-03-28T23:34:35.456Z"),
    payments: mironPayments,
    orders: [
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
      }
    ],
    paymentSummary: {
      totalOrders: 1,
      ordersValue: 19.99,
      refundsValue: 0
    }
  }
];
