import { CustomersApi } from "@features/customers/api/customersApi";
import type { CustomerDetails } from "@features/customers/models/customer.details.model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useCustomerDetails() {
  const { customerId } = useParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!customerId) {
      setIsLoading(false);
      return;
    }

    const loadCustomerDetails = async () => {
      try {
        setIsLoading(true);
        // TODO:: Simulate loading delay, remove after testing
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        const data = await CustomersApi.getById(customerId);
        setCustomer(data);
      } catch (e) {
        // TODO:: Handle error properly, e.g. show notification
        console.error('Failed to load customer', e);
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomerDetails();
  }, [customerId]);

  return { 
    customer, 
    isLoading 
  };
}
