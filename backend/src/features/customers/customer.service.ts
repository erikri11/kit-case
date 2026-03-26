import { v4 as uuidv4 } from "uuid";
import type { Customer, CustomerCreate, CustomerUpdate } from "./customer.model";
import { mockCustomers } from "./customer.mock";
import type { CustomerDetails } from "./customer.details.model";
import { customerDetailsMock } from "./customer.details.mock";
import { calculatePaymentSummary } from "../../utils/calculatePaymentSummary";

let customers: Customer[] = [...mockCustomers];
let customerDetails: CustomerDetails[] = [...customerDetailsMock];

export function listCustomers(): Customer[] {
  return customers;
};

export function getCustomer(id: string): CustomerDetails | null {
  const customer = customerDetails.find((x) => x.id === id);

  if (!customer) return null;

  return {
    ...customer,
    paymentSummary: calculatePaymentSummary(customer.payments)
  };
};

export function createCustomer(input: CustomerCreate): Customer { 
  const customer: Customer = {
    id: uuidv4(),
    name: input.name.trim(),
    email: input.email,
    phone: input.phone,
    avatar: input.avatar || undefined,
    quota: 0,
    status: "Pending",
    createdAt: new Date()
  };

  customers.unshift(customer);

  const customerDetail: CustomerDetails = {
    ...customer,
    payments: [],
    paymentSummary: calculatePaymentSummary([])
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
    avatar: input.avatar || undefined,
    quota: input.quota,
    status: input.status
  };

  customers[customerIndex] = updatedCustomer;

   customerDetails[detailsIndex] = {
    ...customerDetails[detailsIndex],
    ...updatedCustomer,
    paymentSummary: calculatePaymentSummary(customerDetails[detailsIndex].payments)
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
