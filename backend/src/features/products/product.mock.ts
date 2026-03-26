import { generateProductNumber } from "../../utils/generateProductNumber";
import { Product } from "./product.model";

export const mockProducts: Product[] = [
	{
		id: generateProductNumber(),
		name: "Soja & Co. Eucalyptus",
		image: { 
			url: "/product/product-5.png",
			fileName: "product-5.png"
		},
		category: "Skincare",
		type: "Physical",
		quantity: 10,
		currency: "USD",
		price: 65.99,
		sku: "592_LDKDI",
		status: "Draft",
		createdAt: new Date()
	},
	{
		id: generateProductNumber(),
		name: "Necessaire Body Lotion",
		image: { 
			url: "/product/product-4.png",
			fileName: "product-4.png"
		},
		category: "Skincare",
		type: "Physical",
		quantity: 5,
		currency: "USD",
		price: 17.99,
		sku: "321_UWEAJT",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: generateProductNumber(),
		name: "Ritual of Sakura",
		image: { 
			url: "/product/product-3.png",
			fileName: "product-3.png"
		},
		category: "Skincare",
		type: "Physical",
		quantity: 8,
		currency: "USD",
		price: 155,
		sku: "211_QFEXJO",
		status: "Draft",
		createdAt: new Date()
	},
	{
		id: generateProductNumber(),
		name: "Lancome Rouge",
		image: { 
			url: "/product/product-2.png",
			fileName: "product-2.png"
		},
		category: "Makeup",
		type: "Physical",
		quantity: 0,
		currency: "USD",
		price: 95,
		sku: "978_UBFGJC",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: generateProductNumber(),
		name: "Erbology Aloe Vera",
		image: { 
			url: "/product/product-1.png",
			fileName: "product-1.png"
		},
		category: "Healthcare",
		type: "Physical",
		quantity: 10,
		currency: "USD",
		price: 24,
		sku: "401_1BBXBK",
		status: "Published",
		createdAt: new Date()
	},
];
