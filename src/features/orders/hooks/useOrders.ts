import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";
import type { OrderDetails } from "../models/model/order.details.model";
import { connectSocket, socket } from "@shared/socket/socket";
import { EVENTS } from "@shared/models/constants/events.constants";

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
    connectSocket();

    const handleCreated = (order: OrderDetails) => {
      setOrders((prev) =>
        prev.some((o) => o.id === order.id) ? prev : [order, ...prev]
      );
    };
    
    const handleUpdated = (updatedOrder: OrderDetails) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    };
  
    const handleDeleted = (orderId: string) => {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    };
  
    socket.on(EVENTS.ORDER.CREATED, handleCreated);
    socket.on(EVENTS.ORDER.UPDATED, handleUpdated);
    socket.on(EVENTS.ORDER.DELETED, handleDeleted);
  
    return () => {
      socket.off(EVENTS.ORDER.CREATED, handleCreated);
      socket.off(EVENTS.ORDER.UPDATED, handleUpdated);
      socket.off(EVENTS.ORDER.DELETED, handleDeleted);
    };
  }, []);

  const refundedOrders = orders.filter(
    (order) => order.status === "Refunded"
  ).length;

  return { 
    orders, 
    refundedOrders 
  };
}
