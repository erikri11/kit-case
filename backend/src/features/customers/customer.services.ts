import { v4 as uuidv4 } from "uuid";
import type { Customer } from "./customer.model";
import { mockCustomers } from "./customer.mock";
import { generateInitials } from "../../utils/generateInitials";

let customers: Customer[] = [...mockCustomers];

export function listCustomers() {
  return customers;
}

export function getCustomer(id: string) {
  return customers.find((x) => x.id === id) ?? null;
}

export function createCustomer(input: { name: string; email: string; phone?: string; avatarUrl?: string }) {
  const { name, email, phone, avatarUrl } = input;

  const customer: Customer = {
    id: uuidv4(),
    name: name.trim(),
    avatar: avatarUrl || generateInitials(name),
    email,
    phone,
    quota: 0,
    status: "Pending",
    createdAt: new Date(),
  };

  customers.unshift(customer);
  return customer;
}

export function updateCustomer(
  id: string,
  input: { name: string; email: string; phone?: string; quota: number; status: Customer["status"]; avatarUrl?: string }
) {
  const idx = customers.findIndex((x) => x.id === id);
  if (idx < 0) return null;

  const { name, email, phone, quota, status, avatarUrl } = input;

  customers[idx] = {
    ...customers[idx],
    name: name.trim(),
    avatar: avatarUrl || generateInitials(name),
    email,
    phone,
    quota,
    status,
  };

  return customers[idx];
}

export function deleteCustomer(id: string) {
  const before = customers.length;
  customers = customers.filter((x) => x.id !== id);
  return customers.length !== before;
}