import type { BaseEntity } from "@shared/types/baseEntity";

export interface Product extends BaseEntity {
	name: string;
	image: ProductImage | null;
	category: ProductCategory;
	type: ProductType;
	quantity: number;
	currency: Currency;
	price: number;
	sku: string;
	status: ProductStatus;
}

export interface ProductImage {
  url: string;
  fileName: string;
}

export type ProductStatus = "Draft" | "Published";
export type ProductCategory = "Healthcare" | "Makeup" | "Skincare";
export type Currency = "USD" | "EUR" | "NOK";
export type ProductType = "Physical" | "Digital" | "Service";

// Utgår??
export type ProductFieldName = keyof Omit<Product, "id" | "sku" | "createdAt">;

export type ProductCreate = Pick<Product, "name" | "image" | "category" | "type" | "quantity" | "currency" | "price" | "sku" | "status">;
export type ProductUpdate = Pick<Product, "name" | "image" | "category" | "type" | "quantity" | "currency" | "price" | "sku" | "status">;

