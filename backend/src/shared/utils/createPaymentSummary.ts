import { CustomerPayment } from "../../features/customers/customer.payment.model";

export interface PaymentSummary {
  totalOrders: number;
  ordersValue: number;
  refundsValue: number;
}

export function createPaymentSummary(payments: CustomerPayment[]): PaymentSummary {
  return {
    totalOrders: payments.length,
    ordersValue: payments
      .filter((payment) => payment.status === "Completed")
      .reduce((sum, payment) => sum + payment.amount, 0),
    refundsValue: payments
      .filter((payment) => payment.status === "Refunded")
      .reduce((sum, payment) => sum + payment.amount, 0)
  };
}
