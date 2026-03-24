import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { Product } from '@features/products/models/product.model';
import { useProductDeleteDialog } from './useProductDeleteDialog';

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

  const { 
    t, 
    handleDeleteProduct 
  } = useProductDeleteDialog({
    product,
    onClose
  });

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
