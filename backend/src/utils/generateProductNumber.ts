let productCounter = 6;

export function generateProductNumber(): string {
  return `PROD-${String(productCounter++).padStart(4, "0")}`;
}
