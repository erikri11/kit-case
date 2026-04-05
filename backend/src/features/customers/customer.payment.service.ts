import { v4 as uuidv4 } from "uuid";
import type { CustomerPayment } from "./customer.payment.model";
import type { Currency } from "../products/product.model";

const customerPayments: CustomerPayment[] = [];

export function listCustomerPayments(): CustomerPayment[] {
  return customerPayments;
}

export function listCustomerPaymentsByCustomerId(customerId: string): CustomerPayment[] {
  return customerPayments.filter((payment) => payment.customerId === customerId);
}

export function hasPaymentForInvoice(invoiceId: string): boolean {
  return customerPayments.some((payment) => payment.invoiceId === invoiceId);
}

export function getPaymentByInvoice(invoiceId: string): CustomerPayment | null {
  return customerPayments.find((payment) => payment.invoiceId === invoiceId) ?? null;
}

export function createCustomerPayment(input: {
  customerId: string;
  currency: Currency;
  amount: number;
  invoiceId: string;
  status: CustomerPayment["status"];
  createdAt?: Date;
}): CustomerPayment {
  
  const payment: CustomerPayment = {
    id: uuidv4(),
    customerId: input.customerId,
    currency: input.currency,
    amount: input.amount,
    invoiceId: input.invoiceId,
    status: input.status,
    createdAt: input.createdAt ?? new Date()
  };

  customerPayments.unshift(payment);

  return payment;
}

export function updatePaymentStatusByInvoice(
  invoiceId: string,
  status: CustomerPayment["status"]
): CustomerPayment | null {

  const index = customerPayments.findIndex((payment) => payment.invoiceId === invoiceId);
  if (index < 0) return null;

  customerPayments[index] = {
    ...customerPayments[index],
    status
  };

  return customerPayments[index];
}
