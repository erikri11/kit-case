import { useEffect, useState } from "react";
import type { Product } from "../models/product.model";
import { productApi } from "../api/productApi";
import { connectSocket, socket } from "@shared/socket/socket";
import { EVENTS } from "@shared/models/constants/events.constants";

const isActiveProducts = (product: Product) =>
  product.status === "Published";

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
    connectSocket();

    const handleCreated = (product: Product) => {
      setProducts((prev) =>
        prev.some((p) => p.id === product.id) ? prev : [product, ...prev]
      );
    };

    const handleUpdated = (updatedProduct: Product) => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    };

    const handleDeleted = (productId: string) => {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    };

    socket.on(EVENTS.PRODUCT.CREATED, handleCreated);
    socket.on(EVENTS.PRODUCT.UPDATED, handleUpdated);
    socket.on(EVENTS.PRODUCT.DELETED, handleDeleted);

    return () => {
      socket.off(EVENTS.PRODUCT.CREATED, handleCreated);
      socket.off(EVENTS.PRODUCT.UPDATED, handleUpdated);
      socket.off(EVENTS.PRODUCT.DELETED, handleDeleted);
    };
  }, []);

    const latestActiveProducts = products
      .filter(isActiveProducts)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);

  return { 
    products, 
    latestActiveProducts 
  };
}
