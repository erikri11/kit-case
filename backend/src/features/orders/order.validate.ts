import type { Order } from "./order.model";

export function validateCreate(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Invalid body";

  const data = body as Partial<Order>;
  const { name, email, paymentMethod, status, issueDate } = data;

  if (!name || typeof name !== "string") return "Name is required";
  if (!email || typeof email !== "string") return "Email is required";

  if (!paymentMethod || typeof paymentMethod !== "object") return "Payment method is required";
  if (!paymentMethod.type || typeof paymentMethod.type !== "string") return "Payment method type is required";
  if (paymentMethod.last4 !== undefined && typeof paymentMethod.last4 !== "string") return "Payment method last4 must be a string";

  // if (!currency || typeof currency !== "string") return "Currency is required";
  // if (totalAmount === undefined || typeof totalAmount !== "number") return "Total amount is required";
  if (!status || typeof status !== "string") return "Status is required";
  if (!issueDate) return "Issue date is required";

  return null;
}

export function validateUpdate(body: unknown, partial = false): string | null {
  if (!body || typeof body !== "object") return "Invalid body";
  if (!partial) return validateCreate(body);

  const data = body as Partial<Order>;
  const { name, email, paymentMethod, status, issueDate } = data;

  if (name !== undefined && (!name || typeof name !== "string")) return "Name is required";
  if (email !== undefined && (!email || typeof email !== "string")) return "Email is required";

  if (paymentMethod !== undefined) {
    if (!paymentMethod || typeof paymentMethod !== "object") return "Payment method is required";
    if (!paymentMethod.type || typeof paymentMethod.type !== "string") return "Payment method type is required";
    if (paymentMethod.last4 !== undefined && typeof paymentMethod.last4 !== "string") return "Payment method last4 must be a string";
  }

  // if (currency !== undefined && (!currency || typeof currency !== "string")) return "Currency is required";
  // if (totalAmount !== undefined && typeof totalAmount !== "number") return "Total amount is required";
  if (status !== undefined && (!status || typeof status !== "string")) return "Status is required";
  if (issueDate !== undefined && !(typeof issueDate === "string" || issueDate instanceof Date)) return "Issue date is required";

  return null;
}
