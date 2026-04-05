import type { Currency } from "@features/products/models/product.model";
import type { PaymentStatus } from "./payment.constants";

export interface CustomerPayment {
  id: string;
  customerId: string;
  invoiceId: string;
  currency: Currency;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
}
