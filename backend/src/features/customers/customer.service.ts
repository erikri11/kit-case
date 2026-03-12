import { v4 as uuidv4 } from "uuid";
import type { Customer } from "./customer.model";
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
  return customerDetails.find((x) => x.id === id) ?? null;
};

export function createCustomer(input: { 
  name: string; 
  email: string; 
  phone?: string; 
  avatarUrl?: string 
}): Customer {

  const { name, email, phone, avatarUrl } = input;

  const customer: Customer = {
    id: uuidv4(),
    name: name.trim(),
    avatar: avatarUrl || undefined,
    email,
    phone,
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

export function updateCustomer(
  id: string,
  input: { 
    name: string; 
    email: string; 
    phone?: string; 
    quota: number; 
    status: Customer["status"]; 
    avatarUrl?: string 
  }
): Customer | null {
  
  const customerIndex = customers.findIndex((x) => x.id === id);
  if (customerIndex < 0) return null;

  const detailsIndex = customerDetails.findIndex((x) => x.id === id);
  if (detailsIndex < 0) return null;

  const { name, email, phone, quota, status, avatarUrl } = input;

  const updatedCustomer: Customer = {
    ...customers[customerIndex],
    name: name.trim(),
    avatar: avatarUrl || undefined,
    email,
    phone,
    quota,
    status
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
