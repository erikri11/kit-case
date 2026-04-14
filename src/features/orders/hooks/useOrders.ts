import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";
import type { OrderDetails } from "../models/order.details.model";

export function useOrders() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
    
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
