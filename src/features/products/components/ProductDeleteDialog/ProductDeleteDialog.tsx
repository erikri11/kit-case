import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { productApi } from '@features/products/api/productApi';
import type { Product } from '@features/products/models/product.model';
import { useSnackbar } from '@shared/context/snackbar/useSnackbar';

export interface TaskDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
}

export interface ProductDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
}

export function ProductDeleteDialog({
  open,
  onClose,
  product
}: ProductDeleteDialogProps) {

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

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
    >
      <DialogTitle>{t("common:labels.confirmDelete")}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 1 }}>
          {t("common:labels.confirmDeleteMessage")}
        </Typography>
        <Typography sx={{ mt: 1, color: 'customTextGrey.main' }} variant="subtitle2">
          {product?.name}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t("common:actions.cancel")}
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDeleteProduct}
        >
          {t("common:actions.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDeleteDialog;
