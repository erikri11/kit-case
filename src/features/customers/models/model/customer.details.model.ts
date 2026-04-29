import type { Order } from "@features/orders/models/model/order.model";
import type { Customer } from "./customer.model";
import type { CustomerPayment } from "./customer.payment.model";
import type { CustomerPaymentSummary } from "./customer.payment.summary.model";

export interface CustomerDetails extends Customer {
  payments: CustomerPayment[];
  paymentSummary: CustomerPaymentSummary;
  orders: Order[];
}
