import { generateOrderNumber } from "../../utils/generateOrderNumber";
import { customerIds } from "../customers/customer.mock.ids";
import { Order } from "./order.model";

export const mockOrders: Order[] = [
	{
		id: generateOrderNumber(),
		customerId: customerIds.fran,
		paymentMethod: { 
			type: "Amex", 
			last4: "1234" 
		},
		currency: "USD",
		totalAmount: 78.1,
		status: "Pending",
		createdAt: new Date("2026-03-24T19:26:34.456Z"),
		orderNumber: "ORD-1001",
		issueDate: new Date("2026-03-24T19:26:34.456Z")
	},
	{
		id: generateOrderNumber(),
		customerId: customerIds.penjani,
		paymentMethod: { 
			type: "ApplePay" 
		},
		currency: "USD",
		totalAmount: 110.39,
		status: "Completed",
		createdAt: new Date("2026-03-24T19:26:34.456Z"),
		orderNumber: "ORD-1002",
		issueDate: new Date("2026-03-24T19:26:34.456Z")

	},
	{
		id: generateOrderNumber(),
		customerId: customerIds.carson,
		paymentMethod: { 
			type: "Visa", 
			last4: "5678" 
		},
		currency: "USD",
		totalAmount: 25.58,
		status: "Canceled",
		createdAt: new Date("2026-03-24T19:26:34.456Z"),
		orderNumber: "ORD-1003",
		issueDate: new Date("2026-03-24T19:26:34.456Z")
	},
	{
		id: generateOrderNumber(),
		customerId: customerIds.siegbert,
		paymentMethod: { 
			type: "GooglePay" 
		},
		currency: "USD",
		totalAmount: 89.41,
		status: "Rejected",
		createdAt: new Date("2026-03-24T19:26:34.456Z"),
		orderNumber: "ORD-1004",
		issueDate: new Date("2026-03-24T19:26:34.456Z")
	},
	{
		id: generateOrderNumber(),
		customerId: customerIds.miron,
		paymentMethod: { 
			type: "Amex", 
			last4: "1234" 
		},
		currency: "USD",
		totalAmount: 19.99,
		status: "Completed",
		createdAt: new Date("2026-03-24T19:26:34.456Z"),
		orderNumber: "ORD-1005",
		issueDate: new Date("2026-03-24T19:26:34.456Z")
	}
];
