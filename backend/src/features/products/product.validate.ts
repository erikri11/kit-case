import type { Product, ProductImage, ProductStatus } from "./product.model";

const validStatuses: ProductStatus[] = ["Published", "Draft"];

function isValidImage(image: unknown): image is ProductImage {
  if (!image || typeof image !== "object") return false;

  const candidate = image as Partial<ProductImage>;

  return (
    typeof candidate.url === "string" &&
    typeof candidate.fileName === "string"
  );
};

export function validateCreate(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Invalid body";

  const data = body as Partial<Product>;
  const { name, image, category, type, quantity, currency, price, status } = data;

  if (!name || typeof name !== "string" || !name.trim()) return "Name is required";
  if (image !== undefined && image !== null && !isValidImage(image)) {
    return "Image must be a ProductImage or null";
  }
  if (category !== undefined && typeof category !== "string") return "Category must be a string";
  if (type !== undefined && typeof type !== "string") return "Type must be a string";
  if (quantity !== undefined && typeof quantity !== "number") return "Quantity must be a number";
  if (currency !== undefined && typeof currency !== "string") return "Currency must be a string";
  if (price !== undefined && typeof price !== "number") return "Price must be a number";
  if (!validStatuses.includes(status as ProductStatus)) return "Invalid status";
  return null;
};

export function validateUpdate(body: unknown, partial = false): string | null {
  if (!body || typeof body !== "object") return "Invalid body";
  if (!partial) return validateCreate(body);

  const data = body as Partial<Product>;
  const { name, image, category, type, quantity, currency, price, status } = data;

  if (name !== undefined && (!name || typeof name !== "string" || !name.trim())) {
    return "Name is required";
  }
  if (image !== undefined && image !== null && !isValidImage(image)) {
    return "Image must be a ProductImage or null";
  }
  if (category !== undefined && typeof category !== "string") return "Category must be a string";
  if (type !== undefined && typeof type !== "string") return "Type must be a string";
  if (quantity !== undefined && typeof quantity !== "number") return "Quantity must be a number";
  if (currency !== undefined && typeof currency !== "string") return "Currency must be a string";
  if (price !== undefined && typeof price !== "number") return "Price must be a number";
  if (status !== undefined && !validStatuses.includes(status)) return "Invalid status";
  return null;
};
