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
