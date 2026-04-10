import { v4 as uuidv4 } from "uuid";
import { mockProducts } from "./product.mock";
import { Currency, Product, ProductCategory, ProductCreate, ProductStatus, ProductType } from "./product.model";
import { generateSku } from "../../utils/generateSku";
import { generateProductNumber } from "../../utils/generateProductNumber";

let products: Product[] = [...mockProducts];

export function listProducts(): Product[] {
  return products;
};

export function getProduct(id: string): Product | null {
  return products.find((x) => x.id === id) ?? null;
};

export function createProduct(input: ProductCreate): Product {
  const product: Product = {
    id: uuidv4(),
    productNumber: generateProductNumber(),
    name: input.name.trim(),
    image: input.image ?? null,
    category: input.category as ProductCategory,
    type: input.type as ProductType,
    quantity: input.quantity,
    currency: input.currency as Currency,
    price: input.price,
    sku: generateSku(),
    status: "Draft",
    createdAt: new Date()
  };

  products.unshift(product);

  return product;
};

export function updateProduct(id: string, input: ProductCreate): Product | null {
  const index = products.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const updatedProduct: Product = {
    ...products[index],
    name: input.name.trim(),
    image: input.image ?? null,
    category: input.category as ProductCategory,
    type: input.type as ProductType,
    quantity: input.quantity,
    currency: input.currency as Currency,
    price: input.price,
    status: input.status
  };

  products[index] = updatedProduct;

  return updatedProduct;
};

export function updateProductStatus(id: string, status: ProductStatus): Product | null {
  const index = products.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const currentProduct = products[index];

  if (currentProduct.status === "Archived" && status !== "Draft") {
    throw new Error("Archived products can only be restored to Draft");
  }

  const updatedProduct: Product = {
    ...currentProduct,
    status
  };

  products[index] = updatedProduct;

  return updatedProduct;
};

export function deleteProduct(id: string): boolean {
  const before = products.length;
  products = products.filter((x) => x.id !== id);
  return products.length !== before;
};
