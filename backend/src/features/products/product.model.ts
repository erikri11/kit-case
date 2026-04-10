import { BaseEntity } from "../../shared/types/BaseEntity";

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

export type ProductStatus = "Draft" | "Published" | "Archived";
export type ProductCategory =  "Smartphones" | "Computers" | "Tablets";
export type Currency = "USD" | "EUR" | "NOK";
export type ProductType = "Flagship" | "Budget" | "Laptop" | "Desktop" | "Standard" | "Pro";

export type ProductCreate = Pick<Product, "name" | "image" | "category" | "type" | "quantity" | "currency" | "price" | "status">;
export type ProductUpdate = ProductCreate;
