import { customerIds } from "../customers/customer.mock.ids";
import type { Order } from "./order.model";

export const mockOrders: Order[] = [
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
  },
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
  },
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
  },
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
  },
];
