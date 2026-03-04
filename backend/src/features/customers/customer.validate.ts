import { Customer } from "./customer.model";

export function validateCreate(body: Customer) {
  const { name, email, phone } = body ?? {};
  if (typeof name !== 'string' || !name.trim()) return 'name is required';
  if (typeof email !== 'string' || !email.trim()) return 'email is required';
  if (typeof phone !== 'string' || !phone.trim()) return 'phone is required';
  return null;
}

export function validateUpdate(body: Customer, partial = false) {
  if (!partial) return validateCreate(body);
  const { name, email, phone, quota, status } = body ?? {};
  if ('name' in (body ?? {}) && (typeof name !== 'string' || !name.trim())) return 'name must be non-empty string';
  if ('email' in (body ?? {}) && (typeof email !== 'string' || !email.trim())) return 'email must be non-empty string';
  if ('phone' in (body ?? {}) && (typeof phone !== 'string' || !phone.trim())) return 'phone must be non-empty string';
  if ('quota' in (body ?? {}) && (typeof quota !== 'number' || quota < 0)) return 'quota must be a non-negative number';
  if ('status' in (body ?? {}) && (typeof status !== 'string' || !status.trim())) return 'status must be non-empty string';
  return null;
}
