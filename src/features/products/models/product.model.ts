export interface Product {
	id: string;
	name: string;
	image: string | null;
	category: ProductCategory;
	type: ProductType;
	quantity: number;
	currency: Currency;
	price: number;
	sku: string;
	status: ProductStatus;
	createdAt: Date;
}

export type ProductStatus = "Draft" | "Published";
export type ProductCategory = "Healthcare" | "Makeup" | "Skincare";
export type Currency = "USD" | "EUR" | "NOK";
export type ProductType = "Physical" | "Digital" | "Service";

export type ProductFieldName = keyof Omit<Product, "id" | "sku" | "createdAt">;

// POST payload: server sets id, createdAt
export type ProductCreate = Omit<Product, "id" | "sku" | "createdAt">;

// PUT payload: partial update, and still server-owned fields cannot be changed
export type ProductUpdate = Partial<Omit<Product, "id" | "sku" | "createdAt">>;
