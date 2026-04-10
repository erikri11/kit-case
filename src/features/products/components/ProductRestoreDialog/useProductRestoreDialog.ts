import { productApi } from "@features/products/api/productApi";
import type { Product } from "@features/products/models/product.model";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useTranslation } from "react-i18next";

interface UseProductRestoreDialogProps {
  product?: Product;
  onClose: () => void;
}

export function useProductRestoreDialog({ 
  product, 
  onClose 
}: UseProductRestoreDialogProps) {
  
  const { t } = useTranslation(["common", "products"]);
  const { setSnackbarMessage } = useSnackbar();
  
  const handleRestoreProduct = async () => { 
    try {
      if (product?.id) {
        await productApi.patchStatus(product.id, "Draft");
        setSnackbarMessage({ 
          content: t("products:snackbar.restoreSuccess"), 
          type: "success" 
        });
      }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to restore product:", errorMessage);

      setSnackbarMessage({ 
        content: t("products:snackbar.restoreError"), 
        type: "error" 
      });
    }
  };

  return {
    t,
    handleRestoreProduct
  }
}

export default useProductRestoreDialog;
