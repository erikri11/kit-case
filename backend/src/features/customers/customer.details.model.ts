import type { Customer } from "./customer.model";
import { CustomerPayment } from "./customer.payment.model";
import { CustomerPaymentSummary } from "./customer.payment.summary.model";

export interface CustomerDetails extends Customer {
  payments: CustomerPayment[];
  paymentSummary: CustomerPaymentSummary;
}
