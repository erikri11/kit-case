import { useEffect, useState } from "react";
import type { Order } from "../models/order.model";
import { orderApi } from "../api/orderApi";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(() => {
      const loadOrders = async () => {
        try {
          const data = await orderApi.get();
          setOrders(data);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error("Failed to load orders:", errorMessage);
        } 
      };
      loadOrders();
    }, []);


  return orders;
}
