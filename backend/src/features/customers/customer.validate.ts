import type { Customer, CustomerStatus } from "./customer.model";

const validStatuses: CustomerStatus[] = ["Active", "Pending", "Blocked"];

export function validateCreate(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Invalid body";

  const data = body as Partial<Customer>;
  const { name, email, phone } = data;

  if (!name || typeof name !== 'string' || !name.trim()) return 'Name is required';
  if (!email || typeof email !== 'string' || !email.trim()) return 'Email is required';
  if (!phone || typeof phone !== 'string' || !phone.trim()) return 'Phone is required';
  return null;
}

export function validateUpdate(body: unknown, partial = false): string | null {
  if (!body || typeof body !== "object") return "Invalid body";
  if (!partial) return validateCreate(body);

  const data = body as Partial<Customer>;
  const { name, email, phone, quota, status } = data;

  if (name !== undefined && (!name || typeof name !== "string" || !name.trim())) return "Name is required";
  if (email !== undefined && (!email || typeof email !== "string" || !email.trim())) return "Email is required";
  if (phone !== undefined && (!phone || typeof phone !== "string" || !phone.trim())) return "Phone is required";
  if (quota !== undefined && (typeof quota !== "number" || quota < 0)) return "Quota must be a non-negative number";
  if (status !== undefined && !validStatuses.includes(status)) return "Invalid status";
  return null;
}
