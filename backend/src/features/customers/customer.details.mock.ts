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
        totalAmount: 466.00,
        status: "Pending",
        createdAt: new Date("2026-03-24T19:26:34.456Z"),
        orderNumber: "ORD-1001",
        issueDate: new Date("2026-03-24T19:26:34.456Z"),
        lineItems: [
          {
            id: "line-001",
            productId: "prod-0001",
            productNumber: "PROD-0001",
            productName: "Soja & Co. Eucalyptus",
            productImage: {
              url: "/product/product-5.png",
              fileName: "product-5.png"
            },
            quantity: 2,
            currency: "USD",
            unitAmount: 233.00,
            totalAmount: 466.00
          }
        ]
      },
      {
        id: "order-0006",
        customerId: customerIds.fran,
        paymentMethod: { type: "Amex", last4: "1234" },
        currency: "USD",
        totalAmount: 466.00,
        status: "Pending",
        createdAt: new Date("2026-03-24T19:26:34.456Z"),
        orderNumber: "ORD-1006",
        issueDate: new Date("2026-03-24T19:26:34.456Z"),
        lineItems: [
          {
            id: "line-006",
            productId: "prod-0001",
            productNumber: "PROD-0001",
            productName: "Soja & Co. Eucalyptus",
            productImage: {
              url: "/product/product-5.png",
              fileName: "product-5.png"
            },
            quantity: 2,
            currency: "USD",
            unitAmount: 233.00,
            totalAmount: 466.00
          }
        ]
      },
      {
        id: "order-0007",
        customerId: customerIds.fran,
        paymentMethod: { type: "Amex", last4: "1234" },
        currency: "USD",
        totalAmount: 466.00,
        status: "Pending",
        createdAt: new Date("2026-03-24T19:26:34.456Z"),
        orderNumber: "ORD-1007",
        issueDate: new Date("2026-03-24T19:26:34.456Z"),
        lineItems: [
          {
            id: "line-007",
            productId: "prod-0001",
            productNumber: "PROD-0001",
            productName: "Soja & Co. Eucalyptus",
            productImage: {
              url: "/product/product-5.png",
              fileName: "product-5.png"
            },
            quantity: 2,
            currency: "USD",
            unitAmount: 233.00,
            totalAmount: 466.00
          }
        ]
      }
    ],
    paymentSummary: {
      totalOrders: 3,
      ordersValue: 1398.00,
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
        totalAmount: 356.00,
        status: "Pending",
        createdAt: new Date("2026-03-24T19:26:34.456Z"),
        orderNumber: "ORD-1002",
        issueDate: new Date("2026-03-24T19:26:34.456Z"),
        lineItems: [
          {
            id: "line-002",
            productId: "prod-0002",
            productNumber: "PROD-0002",
            productName: "Necessaire Body Lotion",
            productImage: {
              url: "/product/product-4.png",
              fileName: "product-4.png"
            },
            quantity: 2,
            currency: "USD",
            unitAmount: 178.00,
            totalAmount: 356.00
          }
        ]
      }
    ],
    paymentSummary: {
      totalOrders: 1,
      ordersValue: 356.00,
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
        totalAmount: 155.00,
        status: "Pending",
        createdAt: new Date("2026-03-24T19:26:34.456Z"),
        orderNumber: "ORD-1003",
        issueDate: new Date("2026-03-24T19:26:34.456Z"),
        lineItems: [
          {
            id: "line-003",
            productId: "prod-0003",
            productNumber: "PROD-0003",
            productName: "Ritual of Sakura",
            productImage: {
              url: "/product/product-3.png",
              fileName: "product-3.png"
            },
            quantity: 1,
            currency: "USD",
            unitAmount: 155.00,
            totalAmount: 155.00
          }
        ]
      }
    ],
    paymentSummary: {
      totalOrders: 1,
      ordersValue: 155.00,
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
        totalAmount: 390.00,
        status: "Pending",
        createdAt: new Date("2026-03-24T19:26:34.456Z"),
        orderNumber: "ORD-1004",
        issueDate: new Date("2026-03-24T19:26:34.456Z"),
        lineItems: [
          {
            id: "line-004",
            productId: "prod-0004",
            productNumber: "PROD-0004",
            productName: "Lancome Rouge",
            productImage: {
              url: "/product/product-2.png",
              fileName: "product-2.png"
            },
            quantity: 2,
            currency: "USD",
            unitAmount: 195.00,
            totalAmount: 390.00
          }
        ]
      }
    ],
    paymentSummary: {
      totalOrders: 1,
      ordersValue: 390.00,
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
        totalAmount: 490.00,
        status: "Pending",
        createdAt: new Date("2026-03-24T19:26:34.456Z"),
        orderNumber: "ORD-1005",
        issueDate: new Date("2026-03-24T19:26:34.456Z"),
        lineItems: [
          {
            id: "line-005",
            productId: "prod-0005",
            productNumber: "PROD-0005",
            productName: "Erbology Aloe Vera",
            productImage: {
              url: "/product/product-1.png",
              fileName: "product-1.png"
            },
            quantity: 2,
            currency: "USD",
            unitAmount: 245.00,
            totalAmount: 490.00
          }
        ]
      }
    ],
    paymentSummary: {
      totalOrders: 1,
      ordersValue: 490.00,
      refundsValue: 0
    }
  }
];
