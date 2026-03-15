import { Product } from "./product.model";
import { v4 as uuidv4 } from "uuid";

export const mockProducts: Product[] = [
	{
		id: uuidv4(),
		name: "Soja & Co. Eucalyptus",
		image: "/assets/product-5.png",
		category: "Skincare",
		type: "physical",
		quantity: 10,
		currency: "USD",
		price: 65.99,
		sku: "592_LDKDI",
		status: "Draft",
		createdAt: new Date()
	},
	{
		id: uuidv4(),
		name: "Necessaire Body Lotion",
		image: "/assets/product-4.png",
		category: "Skincare",
		type: "physical",
		quantity: 5,
		currency: "USD",
		price: 17.99,
		sku: "321_UWEAJT",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: uuidv4(),
		name: "Ritual of Sakura",
		image: "/assets/product-3.png",
		category: "Skincare",
		type: "physical",
		quantity: 8,
		currency: "USD",
		price: 155,
		sku: "211_QFEXJO",
		status: "Draft",
		createdAt: new Date()
	},
	{
		id: uuidv4(),
		name: "Lancome Rouge",
		image: "/assets/product-2.png",
		category: "Makeup",
		type: "physical",
		quantity: 0,
		currency: "USD",
		price: 95,
		sku: "978_UBFGJC",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: uuidv4(),
		name: "Erbology Aloe Vera",
		image: "/assets/product-1.png",
		category: "Healthcare",
		type: "physical",
		quantity: 10,
		currency: "USD",
		price: 24,
		sku: "401_1BBXBK",
		status: "Published",
		createdAt: new Date()
	},
];
