import type { BaseEntity } from "@shared/types/baseEntity";

export interface Product extends BaseEntity {
	productNumber: string;
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

export type ProductCreate = Pick<Product, "name" | "image" | "category" | "type" | "quantity" | "currency" | "price" | "status">;
export type ProductUpdate = ProductCreate;

export type ProductFieldName = keyof Omit<Product, "id" | "productNumber" | "sku" | "createdAt">;
