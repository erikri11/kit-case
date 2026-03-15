export interface Product {
	id: string;
	name: string;
	image: string | null;
	category: string;
	type: string;
	quantity: number;
	currency: string;
	price: number;
	sku: string;
	status: ProductStatus;
	createdAt: Date;
}

export type ProductStatus = "Published" | "Draft";
