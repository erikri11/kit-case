import type { BaseEntity } from "@shared/types/baseEntity";

export interface Order extends BaseEntity {
	customerId: string;
  paymentMethod: OrderPaymentMethod;
	currency: string;
	totalAmount: number;
	status: OrderStatus;
	orderNumber: string;
	issueDate: Date;
}

export type OrderPaymentMethod = {
  type: "Amex" | "ApplePay" | "GooglePay" | "MasterCard" | "Visa";
  last4?: string;
}

export type OrderStatus = "Pending" | "Completed" | "Canceled" | "Rejected";

// Utgår??
export type OrderFieldName = "customerId" | "paymentMethod";

export type OrderCreate = Pick<Order, "customerId" | "paymentMethod" | "currency" | "totalAmount" | "status" | "issueDate">;
export type OrderUpdate = Pick<Order, "customerId" | "paymentMethod" | "status" | "issueDate">;
