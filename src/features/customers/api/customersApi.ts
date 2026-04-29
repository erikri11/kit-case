import { makeRequest } from '@shared/services/makeRequest';
import type { QueryParams } from '@shared/models/types/QueryParams.type';
import type { Customer, CustomerCreate, CustomerUpdate } from '../models/model/customer.model';
import type { CustomerDetails } from '../models/model/customer.details.model';

function toQuery(params?: QueryParams) {
  if (!params) return '';
  
  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return qs ? `?${qs}` : '';
};

export const customerApi = {
  get: (params?: QueryParams) => (
    makeRequest<Customer[]>(`/customers${toQuery(params)}`)
  ),
  getById: (id: string) => (
    makeRequest<CustomerDetails>(`/customers/${id}`)
  ),
  post: (payload: CustomerCreate) => (
    makeRequest<Customer>(`/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
  ),
  put: (id: string, payload: CustomerUpdate) => (
    makeRequest<Customer>(`/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  ),
  delete: (id: string) => (
    makeRequest<void>(`/customers/${id}`, {
      method: "DELETE",
    })
  )
};
