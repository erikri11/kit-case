export interface CustomerPayment {
  id: string;
  customerId: string;
  invoiceId: string;
  currency: PaymentCurrency;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
}

export type PaymentCurrency = "USD" | "EUR" | "NOK";
export type PaymentStatus = "Completed" | "Pending" | "Failed" | "Refunded";
