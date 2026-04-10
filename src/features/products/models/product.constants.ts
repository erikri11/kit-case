export const PRODUCT_CATEGORIES = [
  "Smartphones",
  "Computers",
  "Tablets"
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];


export const PRODUCT_TYPES = {
  Smartphones: ["Flagship", "Budget"],
  Computers: ["Laptop", "Desktop"],
  Tablets: ["Standard", "Pro"]
} as const;

export type ProductTypeMap = {
  [K in ProductCategory]: (typeof PRODUCT_TYPES)[K][number];
}

export type ProductType = ProductTypeMap[ProductCategory];


export const CURRENCIES = [
  "USD", 
  "EUR", 
  "NOK"
] as const;

export type Currency = typeof CURRENCIES[number];


export const PRODUCT_STATUSES = [
  "Draft",
  "Published",
  "Archived"
] as const;

export type ProductStatus = typeof PRODUCT_STATUSES[number];
