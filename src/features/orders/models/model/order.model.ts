import type { BaseEntity } from "@shared/models/model/baseEntity.model";
import type { LineItem } from "./lineItem.model";
import type { OrderStatus } from "../constants/order.constants";
import type { Currency } from "@features/products/models/product.constants";

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
