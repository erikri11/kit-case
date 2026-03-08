import { CustomerPayment } from "../features/customers/customer.payment.model";

export function calculatePaymentSummary(payments: CustomerPayment[]) {
  const totalOrders = payments.length;

  const ordersValue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const refundsValue = payments
    .filter((p) => p.status === "refunded")
    .reduce((sum, p) => sum + p.amount, 0);

  return {
    totalOrders,
    ordersValue,
    refundsValue
  };
}
