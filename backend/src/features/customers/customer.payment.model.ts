import { Currency } from "../products/product.model";

export interface CustomerPayment {
  id: string;
  customerId: string;
  invoiceId: string;
  currency: Currency;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
}

export type PaymentStatus = "Completed" | "Pending" | "Failed" | "Refunded";
