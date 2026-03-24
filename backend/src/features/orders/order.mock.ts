import { Order } from "./order.model";
import { v4 as uuidv4 } from "uuid";

export const mockOrders: Order[] = [
	{
		id: uuidv4(),
		avatar: "/avatar/avatar-3.png",
		name: "Carson Darrin", 
		email: "carson.darrin@domain.com",
		paymentMethod: { 
			type: "Amex", 
			last4: "1234" 
		},
		currency: "USD",
		totalAmount: 78.1,
		status: "Pending",
		createdAt: new Date(),
		orderNumber: "ORD-1001",
		issueDate: new Date()
	},
	{
		id: uuidv4(),
		avatar: "/avatar/avatar-5.png",
		name: "Fran Perez", 
		email: "fran.perez@domain.com",
		paymentMethod: { 
			type: "ApplePay" 
		},
		currency: "USD",
		totalAmount: 110.39,
		status: "Completed",
		createdAt: new Date(),
		orderNumber: "ORD-1002",
		issueDate: new Date()

	},
	{
		id: uuidv4(),
		avatar: "/avatar/avatar-8.png",
		name: "Jie Yan", 
		email: "jie.yan@domain.com",
		paymentMethod: { 
			type: "Visa", 
			last4: "5678" 
		},
		currency: "USD",
		totalAmount: 25.58,
		status: "Canceled",
		createdAt: new Date(),
		orderNumber: "ORD-1003",
		issueDate: new Date()
	},
	{
		id: uuidv4(),
		avatar: "/avatar/avatar-2.png",
		name: "Siegbert Gottfried", 
		email: "siegbert.gottfried@domain.com",
		paymentMethod: { 
			type: "GooglePay" 
		},
		currency: "USD",
		totalAmount: 89.41,
		status: "Rejected",
		createdAt: new Date(),
		orderNumber: "ORD-1004",
		issueDate: new Date()
	},
	{
		id: uuidv4(), 
		avatar: "/avatar/avatar-1.png",
		name: "Miron Vitold", 
		email: "miron.vitold@domain.com",
		paymentMethod: { 
			type: "Amex", 
			last4: "1234" 
		},
		currency: "USD",
		totalAmount: 19.99,
		status: "Completed",
		createdAt: new Date(),
		orderNumber: "ORD-1005",
		issueDate: new Date()
	}
];
