import type { CustomerPayment } from "../features/customers/customer.payment.model";

export function calculatePaymentStats(payments: CustomerPayment[]) {
  const refundsValue = payments
    .filter((payment) => payment.status === "Refunded")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return {
    refundsValue
  };
}
