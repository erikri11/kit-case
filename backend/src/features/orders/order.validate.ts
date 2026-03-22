import { Order } from "./order.model";

export function validateCreate(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Invalid body";

  const data = body as Partial<Order>;
  const { customer, paymentMethod, currency, totalAmount, status } = data;

  if (!customer || typeof customer !== "string" || !customer) return "Customer is required";
  if (!paymentMethod || typeof paymentMethod !== "string" || !paymentMethod) return "Payment method is required";
  if (!currency || typeof currency !== "string" || !currency) return "Currency is required";
  if (totalAmount === undefined || typeof totalAmount !== "number") return "Total amount is required";
  if (!status || typeof status !== "string" || !status) return "Status is required";
  return null;
};

export function validateUpdate(body: unknown, partial = false): string | null {
  if (!body || typeof body !== "object") return "Invalid body";
  if (!partial) return validateCreate(body);

  const data = body as Partial<Order>;
  const { customer, paymentMethod, currency, totalAmount, status } = data;
  
  if (customer !== undefined && (!customer || typeof customer !== "string")) return "Customer is required";
  if (paymentMethod !== undefined && (!paymentMethod || typeof paymentMethod !== "string")) return "Payment method is required";
  if (currency !== undefined && (!currency || typeof currency !== "string")) return "Currency is required";
  if (totalAmount !== undefined && typeof totalAmount !== "number") return "Total amount is required";
  if (status !== undefined && (!status || typeof status !== "string")) return "Status is required";
  return null;
};
