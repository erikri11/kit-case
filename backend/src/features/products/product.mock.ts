import { Product } from "./product.model";

export const mockProducts: Product[] = [
	{
		id: "prod-0001",
		productNumber: "PROD-0001",
		name: "Soja & Co. Eucalyptus",
		image: { 
			url: "/product/product-5.png",
			fileName: "product-5.png"
		},
		category: "Skincare",
		type: "Physical",
		quantity: 10,
		currency: "USD",
		price: 233.00,
		sku: "592_LDKDI",
		status: "Draft",
		createdAt: new Date()
	},
	{
		id: "prod-0002",
		productNumber: "PROD-0002",
		name: "Necessaire Body Lotion",
		image: { 
			url: "/product/product-4.png",
			fileName: "product-4.png"
		},
		category: "Skincare",
		type: "Physical",
		quantity: 5,
		currency: "USD",
		price: 178.00,
		sku: "321_UWEAJT",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: "prod-0003",
		productNumber: "PROD-0003",
		name: "Ritual of Sakura",
		image: { 
			url: "/product/product-3.png",
			fileName: "product-3.png"
		},
		category: "Skincare",
		type: "Physical",
		quantity: 8,
		currency: "USD",
		price: 155.00,
		sku: "211_QFEXJO",
		status: "Draft",
		createdAt: new Date()
	},
	{
		id: "prod-0004",
		productNumber: "PROD-0004",
		name: "Lancome Rouge",
		image: { 
			url: "/product/product-2.png",
			fileName: "product-2.png"
		},
		category: "Makeup",
		type: "Physical",
		quantity: 11,
		currency: "USD",
		price: 195.00,
		sku: "978_UBFGJC",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: "prod-0005",
		productNumber: "PROD-0005",
		name: "Erbology Aloe Vera",
		image: { 
			url: "/product/product-1.png",
			fileName: "product-1.png"
		},
		category: "Healthcare",
		type: "Physical",
		quantity: 10,
		currency: "USD",
		price: 245.00,
		sku: "401_1BBXBK",
		status: "Published",
		createdAt: new Date()
	}
];
