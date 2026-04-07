import { Product } from "./product.model";

export const mockProducts: Product[] = [
	{
		id: "prod-0001",
		productNumber: "PROD-0001",
		name: "Apple iPhone 14 Pro Max - 256 GB - Black",
		image: { 
			url: "/products/product-1.png",
			fileName: "product-1.png"
		},
		category: "Smartphones",
		type: "Flagship",
		quantity: 9,
		currency: "USD",
		price: 530.00,
		sku: "592_LDKDI",
		status: "Draft",
		createdAt: new Date()
	},
	{
		id: "prod-0002",
		productNumber: "PROD-0002",
		name: "Apple iPhone 14 Pro Max - 256 GB - White",
		image: { 
			url: "/products/product-2.png",
			fileName: "product-2.png"
		},
		category: "Smartphones",
		type: "Flagship",
		quantity: 5,
		currency: "USD",
		price: 530.00,
		sku: "321_UWEAJT",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: "prod-0003",
		productNumber: "PROD-0003",
		name: "Apple iPhone 14 Pro Max - 256 GB - Gold",
		image: { 
			url: "/products/product-3.png",
			fileName: "product-3.png"
		},
		category: "Smartphones",
		type: "Flagship",
		quantity: 8,
		currency: "USD",
		price: 530.00,
		sku: "211_QFEXJO",
		status: "Draft",
		createdAt: new Date()
	},
	{
		id: "prod-0004",
		productNumber: "PROD-0004",
		name: "Apple iPhone 14 Pro Max - 256 GB - Purple",
		image: { 
			url: "/products/product-4.png",
			fileName: "product-4.png"
		},
		category: "Smartphones",
		type: "Flagship",
		quantity: 11,
		currency: "USD",
		price: 530.00,
		sku: "978_UBFGJC",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: "prod-0005",
		productNumber: "PROD-0005",
		name: "Samsung Galaxy S22 Ultra - 256 GB - Black",
		image: { 
			url: "/products/product-5.png",
			fileName: "product-5.png"
		},
		category: "Smartphones",
		type: "Flagship",
		quantity: 12,
		currency: "USD",
		price: 330.00,
		sku: "742_KJH92P",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: "prod-0006",
		productNumber: "PROD-0006",
		name: "Samsung Galaxy S22 Ultra - 256 GB - White",
		image: { 
			url: "/products/product-6.png",
			fileName: "product-6.png"
		},
		category: "Smartphones",
		type: "Flagship",
		quantity: 6,
		currency: "USD",
		price: 330.00,
		sku: "118_XQ7MZA",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: "prod-0007",
		productNumber: "PROD-0007",
		name: "Samsung Galaxy S22 Ultra - 256 GB - Orange",
		image: { 
			url: "/products/product-7.png",
			fileName: "product-7.png"
		},
		category: "Smartphones",
		type: "Flagship",
		quantity: 10,
		currency: "USD",
		price: 330.00,
		sku: "401_1BBXBK",
		status: "Published",
		createdAt: new Date()
	},
	{
		id: "prod-0008",
		productNumber: "PROD-0008",
		name: "Samsung Galaxy S22 Ultra - 256 GB - Purple",
		image: { 
			url: "/products/product-8.png",
			fileName: "product-8.png"
		},
		category: "Smartphones",
		type: "Flagship",
		quantity: 8,
		currency: "USD",
		price: 330.00,
		sku: "563_PL9TWD",
		status: "Published",
		createdAt: new Date()
	}
];
