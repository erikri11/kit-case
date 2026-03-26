import { makeRequest } from "@shared/services/makeRequest";
import type { QueryParams } from "@shared/types/QueryParams";
import type { OrderCreate, OrderUpdate } from "../models/order.model";
import type { OrderDetails } from "../models/order.details.model";

function toQuery(params?: QueryParams) {
  if (!params) return "";

  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return qs ? `?${qs}` : "";
}

export const orderApi = {
  get: (params?: QueryParams) =>
    makeRequest<OrderDetails[]>(`/orders${toQuery(params)}`),

  // getById: (id: string) =>
  //   makeRequest<OrderDetails>(`/orders/${id}`),

  post: (payload: OrderCreate) =>
    makeRequest<OrderDetails>(`/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }),

  put: (id: string, payload: OrderUpdate) =>
    makeRequest<OrderDetails>(`/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }),

  delete: (id: string) =>
    makeRequest<void>(`/orders/${id}`, {
      method: "DELETE"
    })
};