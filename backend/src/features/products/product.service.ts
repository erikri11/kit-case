import { v4 as uuidv4 } from "uuid";
import { mockProducts } from "./product.mock";
import { Currency, Product, ProductCategory, ProductType } from "./product.model";
import { generateSku } from "../../utils/generateSku";

let products: Product[] = [...mockProducts];

export function listProducts(): Product[] {
  return products;
};

export function getProduct(id: string): Product | null {
  return products.find((x) => x.id === id) ?? null;
};

export function createProduct(input: {
  name: string;
  image: string | null;
  category: string;
  type: string;
  quantity: number;
  currency: string;
  price: number;
  status: Product["status"];
}): Product {
  const { name, image, category, type, quantity, currency, price } = input;

  const product: Product = {
    id: uuidv4(),
    name: name.trim(),
    image: image ?? null,
    category: category as ProductCategory,
    type: type as ProductType,
    quantity: quantity,
    currency: currency as Currency,
    price: price,
    sku: generateSku(),
    status: "Draft",
    createdAt: new Date()
  };

  products.unshift(product);

  return product;
};

export function updateProduct(
  id: string,
  input: {
    name: string;
    image: string | null;
    category: string;
    type: string;
    quantity: number;
    currency: string;
    price: number;
    status: Product["status"];
  }
): Product | null {

  const index = products.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const { name, image, category, type, quantity, currency, price, status } = input;

  const updatedProduct: Product = {
    ...products[index],
    name: name.trim(),
    image: image ?? null,
    category: category as ProductCategory,
    type: type as ProductType,
    quantity,
    currency: currency as Currency,
    price,
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
