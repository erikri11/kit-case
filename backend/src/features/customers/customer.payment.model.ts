import { BaseEntity } from "../../shared/types/BaseEntity";
import { Currency } from "../products/product.model";

export interface CustomerPayment extends BaseEntity {
  customerId: string;
  invoiceId: string;
  currency: Currency;
  amount: number;
  status: PaymentStatus;
}

export type PaymentStatus = "Completed" | "Pending" | "Failed" | "Refunded";
