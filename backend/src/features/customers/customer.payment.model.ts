export interface CustomerPayment {
  id: string;
  customerId: string;
  currency: PaymentCurrency;
  amount: number;
  invoiceId: string;
  status: PaymentStatus;
  createdAt: Date;
}

export type PaymentCurrency = "USD" | "EUR" | "NOK";
export type PaymentStatus = "Completed" | "Pending" | "Failed" | "Refunded";
