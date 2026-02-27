import { Customer } from "../models/customer";

export function validateCreate(body: Customer) {
  const { name, avatar, email, phone, quota, status, createdAt } = body ?? {};
  if (typeof name !== 'string' || !name.trim()) return 'name is required';
  if (typeof avatar !== 'string') return 'avatar must be a string';
  if (typeof email !== 'string' || !email.trim()) return 'email is required';
  if (typeof phone !== 'string' || !phone.trim()) return 'phone is required';
  if (typeof quota !== 'number') return 'quota must be a number';
  if (typeof status !== 'string' || !status.trim()) return 'status is required';
  if (createdAt != null && !(createdAt instanceof Date)) return 'createdAt must be a Date';
  return null;
}

export function validateUpdate(body: Customer, partial = false) {
  if (!partial) return validateCreate(body);
  const { name, avatar, email, phone, quota, status, createdAt } = body ?? {};
  if ('name' in (body ?? {}) && (typeof name !== 'string' || !name.trim())) return 'name must be non-empty string';
  if ('avatar' in (body ?? {}) && typeof avatar !== 'string') return 'avatar must be a string';
  if ('email' in (body ?? {}) && (typeof email !== 'string' || !email.trim())) return 'email must be non-empty string';
  if ('phone' in (body ?? {}) && (typeof phone !== 'string' || !phone.trim())) return 'phone must be non-empty string';
  if ('quota' in (body ?? {}) && typeof quota !== 'number') return 'quota must be a number';
  if ('status' in (body ?? {}) && (typeof status !== 'string' || !status.trim())) return 'status must be non-empty string';
  if ('createdAt' in (body ?? {}) && !(createdAt instanceof Date)) return 'createdAt must be a Date';
  return null;
}
