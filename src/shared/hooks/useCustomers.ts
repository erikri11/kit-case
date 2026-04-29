import { useEffect, useState } from 'react';
import { customerApi } from '@features/customers/api/customersApi';
import type { Customer } from "@features/customers/models/model/customer.model";
import { connectSocket, socket } from '@shared/socket/socket';
import { EVENTS } from '@shared/models/constants/events.constants';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await customerApi.get();
        setCustomers(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Failed to load customers:", errorMessage);
      } 
    };

    loadCustomers();
    connectSocket();

    const handleCreated = (customer: Customer) => {
      setCustomers((prev) =>
        prev.some((c) => c.id === customer.id) ? prev : [customer, ...prev]
      );
    };

    const handleUpdated = (updatedCustomer: Customer) => {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
    };

    const handleDeleted = (customerId: string) => {
      setCustomers((prev) => prev.filter((customer) => customer.id !== customerId));
    };

    socket.on(EVENTS.CUSTOMER.CREATED, handleCreated);
    socket.on(EVENTS.CUSTOMER.UPDATED, handleUpdated);
    socket.on(EVENTS.CUSTOMER.DELETED, handleDeleted);

    return () => {
      socket.off(EVENTS.CUSTOMER.CREATED, handleCreated);
      socket.off(EVENTS.CUSTOMER.UPDATED, handleUpdated);
      socket.off(EVENTS.CUSTOMER.DELETED, handleDeleted);
    };
  }, []);

  return customers;
}
