import type { Currency } from "@features/products/models/product.model";
import type { BaseEntity } from "@shared/types/baseEntity";
import type { LineItem } from "./lineItem.model";
import type { OrderStatus } from "./order.constants";

export interface Order extends BaseEntity {
	customerId: string;
  paymentMethod: OrderPaymentMethod;
	currency: Currency;
	totalAmount: number;
	status: OrderStatus;
	orderNumber: string;
	issueDate: Date;
	lineItems: LineItem[];
	isMocked?: boolean;
}

export type OrderPaymentMethod = {
  type: "Amex" | "ApplePay" | "GooglePay" | "MasterCard" | "Visa";
  last4?: string;
}

export type OrderCreate = Pick<Order, "customerId" | "paymentMethod" | "currency" | "totalAmount" | "issueDate" | "lineItems">;
export type OrderUpdate = Pick<Order, "customerId" | "paymentMethod" | "status" | "issueDate" | "lineItems">;

export type OrderFieldName = "customerId" | "paymentMethod";
