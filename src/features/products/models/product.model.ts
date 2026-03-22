export interface Product {
	id: string;
	name: string;
	image: ProductImage | null;
	category: ProductCategory;
	type: ProductType;
	quantity: number;
	currency: Currency;
	price: number;
	sku: string;
	status: ProductStatus;
	createdAt: Date;
}

export interface ProductImage {
  url: string;
  fileName: string;
}

export type ProductStatus = "Draft" | "Published";
export type ProductCategory = "Healthcare" | "Makeup" | "Skincare";
export type Currency = "USD" | "EUR" | "NOK";
export type ProductType = "Physical" | "Digital" | "Service";

export type ProductFieldName = keyof Omit<Product, "id" | "sku" | "createdAt">;

// POST payload: server sets id, sku, createdAt
export type ProductCreate = Omit<Product, "id" | "sku" | "createdAt">;

// PUT payload: partial update, and still server-owned fields cannot be changed
export type ProductUpdate = Partial<Omit<Product, "id" | "sku" | "createdAt">>;
