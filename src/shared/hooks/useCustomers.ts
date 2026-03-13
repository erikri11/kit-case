import { useEffect, useState } from 'react';
import { customerApi } from '@features/customers/api/customersApi';
import type { Customer } from "@features/customers/models/customer.model";

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
  }, []);

  return customers;
}
