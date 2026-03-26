import { v4 as uuidv4 } from "uuid";
import { mockProducts } from "./product.mock";
import { Currency, Product, ProductCategory, ProductCreate, ProductType } from "./product.model";
import { generateSku } from "../../utils/generateSku";

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

export function deleteProduct(id: string): boolean {
  const before = products.length;
  products = products.filter((x) => x.id !== id);
  return products.length !== before;
};
