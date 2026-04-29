import type { BaseEntity } from "@shared/models/model/baseEntity.model";
import type { Currency, ProductCategory, ProductStatus, ProductType } from "./product.constants";

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

export type ProductCreate = Pick<Product, "name" | "image" | "category" | "type" | "quantity" | "currency" | "price" | "status">;
export type ProductUpdate = ProductCreate;

export type ProductFieldName = keyof Omit<Product, "id" | "productNumber" | "sku" | "createdAt"| "status">;
