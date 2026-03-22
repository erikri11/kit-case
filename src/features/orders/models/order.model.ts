export interface Order {
  id: string;
	name: string;
  email: string;
	avatar?: string;
	avatarUrl?: string;
  paymentMethod: OrderPaymentMethod;
	currency: string;
	totalAmount: number;
	status: OrderStatus;
	createdAt: Date;
	orderNumber: string;
	thumbnail?: string;
}

export type OrderPaymentMethod = {
  type: "Amex" | "ApplePay" | "GooglePay" | "MasterCard" | "Visa";
  last4?: string;
}

export type OrderStatus = "Pending" | "Completed" | "Canceled" | "Rejected";

// POST payload: server sets id, createdAt, orderNumber
export type OrderCreate = Omit<Order, "id" | "createdAt" | "orderNumber">;

// PUT payload: partial update, and still server-owned fields cannot be changed
export type OrderUpdate = Partial<Omit<Order, "id" | "createdAt" | "orderNumber">>;
