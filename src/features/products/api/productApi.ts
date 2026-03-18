import { makeRequest } from '@shared/services/makeRequest';
import type { QueryParams } from '@shared/types/QueryParams';
import type { Product, ProductCreate, ProductUpdate } from '../models/product.model';

function toQuery(params?: QueryParams) {
  if (!params) return '';
  
  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return qs ? `?${qs}` : '';
};

export const productApi = {
  get: (params?: QueryParams) => (
    makeRequest<Product[]>(`/products${toQuery(params)}`)
  ),
  // getById: (id: string) => (
  //   makeRequest<ProductDetails>(`/products/${id}`)
  // ),
  post: (payload: ProductCreate) => (
    makeRequest<Product>(`/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  ),
  put: (id: string, payload: ProductUpdate) => (
    makeRequest<Product>(`/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  ),
  delete: (id: string) => (
    makeRequest<void>(`/products/${id}`, {
      method: 'DELETE',
    })
  )
};
