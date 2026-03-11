import { useEffect, useState } from 'react';
import { CustomersApi } from "@features/customers/api/customersApi";
import type { Customer } from "@features/customers/models/customer.model";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const apiCustomers = await CustomersApi.get();
        setCustomers(apiCustomers);
      } catch (error) {
        console.error('Failed to load customers', error);
      } 
    };
    loadCustomers();
  }, []);

  return customers;
}
