import { customerApi } from "@features/customers/api/customersApi";
import type { CustomerDetails } from "@features/customers/models/model/customer.details.model";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export function useCustomerDetails() {
  const { t } = useTranslation("customers");
  const { setSnackbarMessage } = useSnackbar();
  
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
        const data = await customerApi.getById(customerId);
        setCustomer(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Failed to load customer: ${errorMessage}`);

        setSnackbarMessage({ 
          content: t("customers:snackbar.loadError"), 
          type: "error" 
        });

        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomerDetails();
  }, [customerId, t, setSnackbarMessage]);

  return { 
    customer, 
    isLoading 
  }
}
