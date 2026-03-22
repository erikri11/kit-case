let orderCounter = 6;

export function generateOrderNumber(): string {
  return `ORD-${String(orderCounter++).padStart(4, "0")}`;
}
