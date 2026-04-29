import { makeRequest } from '@shared/services/makeRequest';
import type { Product, ProductCreate, ProductUpdate } from '../models/product.model';
import type { QueryParams } from '@shared/models/types/QueryParams.type';
import type { ProductStatus } from '../models/product.constants';

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
  patchStatus: (id: string, status: ProductStatus) => (
    makeRequest<Product>(`/products/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
  ),
  delete: (id: string) => (
    makeRequest<void>(`/products/${id}`, {
      method: 'DELETE',
    })
  )
};
