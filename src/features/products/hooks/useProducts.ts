import { useEffect, useState } from "react";
import type { Product } from "../models/product.model";
import { productApi } from "../api/productApi";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productApi.get();
        setProducts(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Failed to load products:", errorMessage);
      } 
    };
    loadProducts();
  }, []);

  return products;
}
