import { makeRequest } from '@shared/services/makeRequest';
import type { QueryParams } from '@shared/types/QueryParams';
import type { Order, OrderCreate, OrderUpdate } from '../models/order.model';

function toQuery(params?: QueryParams) {
  if (!params) return '';
  
  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return qs ? `?${qs}` : '';
};

export const orderApi = {
  get: (params?: QueryParams) => (
    makeRequest<Order[]>(`/orders${toQuery(params)}`)
  ),
  // getById: (id: string) => (
  //   makeRequest<OrderDetails>(`/orders/${id}`)
  // ),
  post: (payload: OrderCreate) => (
    makeRequest<Order>(`/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  ),
  put: (id: string, payload: OrderUpdate) => (
    makeRequest<Order>(`/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  ),
  delete: (id: string) => (
    makeRequest<void>(`/orders/${id}`, {
      method: 'DELETE',
    })
  )
};
