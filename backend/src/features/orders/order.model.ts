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
	issueDate: Date;
}

export type OrderPaymentMethod = {
  type: "Amex" | "ApplePay" | "GooglePay" | "MasterCard" | "Visa";
  last4?: string;
}

export type OrderStatus = "Pending" | "Completed" | "Canceled" | "Rejected";
