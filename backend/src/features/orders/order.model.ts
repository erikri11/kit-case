import { Currency } from "../products/product.model";

export interface Order {
  id: string;
	customerId: string;
  paymentMethod: OrderPaymentMethod;
	currency: Currency;
	totalAmount: number;
	status: OrderStatus;
	createdAt: Date;
	orderNumber: string;
	issueDate: Date;
}

export type OrderPaymentMethod = {
  type: "Amex" | "ApplePay" | "GooglePay" | "MasterCard" | "Visa";
  last4?: string;
}

export type OrderStatus = "Pending" | "Completed" | "Canceled" | "Rejected";

export type OrderCreate = Pick<Order, "customerId" | "paymentMethod" | "currency" | "totalAmount" | "status" | "issueDate">;
export type OrderUpdate = Pick<Order, "customerId" | "paymentMethod" | "status" | "issueDate">;
