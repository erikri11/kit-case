import { productApi } from "@features/products/api/productApi";
import type { Product } from "@features/products/models/product.model";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useTranslation } from "react-i18next";

interface UseProductDeleteDialogProps {
  product?: Product;
  onClose: () => void;
}

export function useProductDeleteDialog({ 
  product, 
  onClose 
}: UseProductDeleteDialogProps) {
  
  const { t } = useTranslation(["common", "products"]);
  const { setSnackbarMessage } = useSnackbar();
  
  const handleDeleteProduct = async () => { 
    try {
      if (product?.id) {
        await productApi.delete(product.id);
        setSnackbarMessage({ 
          content: t("products:snackbar.deleteSuccess"), 
          type: "success" 
        });
      }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to delete product:", errorMessage);

      setSnackbarMessage({ 
        content: t("products:snackbar.deleteError"), 
        type: "error" 
      });
    }
  };

  return {
    t,
    handleDeleteProduct
  }
}

export default useProductDeleteDialog;
