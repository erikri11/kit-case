import { makeRequest } from '@shared/services/makeRequest';
import type { QueryParams } from '@shared/types/QueryParams';
import type { Customer, CustomerCreate, CustomerUpdate } from '../models/customer';

function toQuery(params?: QueryParams) {
  if (!params) return '';
  
  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return qs ? `?${qs}` : '';
}

export const CustomersApi = {
  get: (params?: QueryParams) => (
    makeRequest<Customer[]>(`/customers${toQuery(params)}`)
  ),
  post: (payload: CustomerCreate) => (
    makeRequest<Customer>(`/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  ),
  put: (id: string, payload: CustomerUpdate) => (
    makeRequest<Customer>(`/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  ),
  delete: (id: string) => (
    makeRequest<void>(`/customers/${id}`, {
      method: 'DELETE',
    })
  )
};
