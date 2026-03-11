import { CustomersApi } from "@features/customers/api/customersApi";
import type { Customer } from "@features/customers/models/customer.model";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useTranslation } from "react-i18next";

export function useCustomerDeleteDialog(
  onClose: () => void, 
  customer?: Customer
) {
  const { t } = useTranslation('customers');
  const { setSnackbarMessage } = useSnackbar();
  
  const handleDeleteCustomer = async () => { 
    try {
      if (customer?.id) {
        await CustomersApi.delete(customer.id);
        setSnackbarMessage({ 
          content: t("customers:snackbar.deleteSuccess"), 
          type: "success" 
        });
      }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error deleting customer:', errorMessage);

      setSnackbarMessage({ 
        content: t("customers:snackbar.deleteError"), 
        type: "error" 
      });
    }
  };

  return {
    t,
    handleDeleteCustomer
  }
}
