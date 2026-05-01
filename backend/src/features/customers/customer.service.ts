import { v4 as uuidv4 } from "uuid";
import type { Customer, CustomerCreate, CustomerUpdate } from "./customer.model";
import { mockCustomers } from "./customer.mock";
import type { CustomerDetails } from "./customer.details.model";
import { customerDetailsMock } from "./customer.details.mock";
import { listOrders } from "../orders/order.service";
import { listCustomerPaymentsByCustomerId } from "./customer.payment.service";
import { Currency } from "../products/product.model";
import { generateCustomerNumber } from "../../shared/utils/generateCustomerNumber";
import { calculateOrderSummaryInBaseCurrency } from "../../shared/utils/calculateOrderSummaryInBaseCurrency";
import { calculatePaymentStatsInBaseCurrency } from "../../shared/utils/calculatePaymentStatsInBaseCurrency";

let customers: Customer[] = [...mockCustomers];
let customerDetails: CustomerDetails[] = [...customerDetailsMock];

export function listCustomers(): Customer[] {
  return customers;
};

export function getCustomer(id: string): CustomerDetails | null {
  const customer = customerDetails.find((x) => x.id === id);

  if (!customer) return null;

  const customerOrders = listOrders().filter((order) => order.customerId === id);
  const customerPayments = listCustomerPaymentsByCustomerId(id);

  const baseCurrency: Currency = "NOK";

  const orderSummary = calculateOrderSummaryInBaseCurrency(
    customerOrders,
    baseCurrency
  );

  const paymentStats = calculatePaymentStatsInBaseCurrency(
    customerPayments,
    baseCurrency
  );

  return {
    ...customer,
    orders: customerOrders,
    payments: customerPayments,
    paymentSummary: {
     totalOrders: orderSummary.totalOrders,
      ordersValueBase: orderSummary.ordersValueBase,
      refundsValueBase: paymentStats.refundsValueBase,
      baseCurrency
    }
  };
};

export function createCustomer(input: CustomerCreate): Customer { 
  const customer: Customer = {
    id: uuidv4(),
    customerNumber: generateCustomerNumber(),
    name: input.name.trim(),
    email: input.email,
    phone: input.phone,
    company: input.company || "",
    avatar: input.avatar || undefined,
    quota: 0,
    status: "Active",
    createdAt: new Date()
  };

  customers.unshift(customer);

  const customerDetail: CustomerDetails = {
    ...customer,
    payments: [],
    orders: [],
    paymentSummary: {
      totalOrders: 0,
      ordersValueBase: 0,
      refundsValueBase: 0,
      baseCurrency: "NOK"
    }
  };

  customerDetails.unshift(customerDetail);

  return customer;
};

export function updateCustomer(id: string, input: CustomerUpdate): Customer | null { 
  const customerIndex = customers.findIndex((x) => x.id === id);
  if (customerIndex < 0) return null;

  const detailsIndex = customerDetails.findIndex((x) => x.id === id);
  if (detailsIndex < 0) return null;

  const updatedCustomer: Customer = {
    ...customers[customerIndex],
    name: input.name.trim(),
    email: input.email,
    phone: input.phone,
    company: input.company || "",
    avatar: input.avatar || undefined,
    quota: input.quota,
    status: input.status
  };

  customers[customerIndex] = updatedCustomer;

   customerDetails[detailsIndex] = {
    ...customerDetails[detailsIndex],
    ...updatedCustomer
  };

   return updatedCustomer;
};

export function deleteCustomer(id: string): boolean {
  const customersBefore = customers.length;
  const detailsBefore = customerDetails.length;

  customers = customers.filter((x) => x.id !== id);
  customerDetails = customerDetails.filter((x) => x.id !== id);

  return customers.length !== customersBefore || customerDetails.length !== detailsBefore;
};
