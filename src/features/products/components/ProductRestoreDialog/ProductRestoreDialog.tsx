import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { Product } from '@features/products/models/product.model';
import useProductRestoreDialog from './useProductRestoreDialog';

export interface ProductRestoreDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
}

export function ProductRestoreDialog({
  open,
  onClose,
  product
}: ProductRestoreDialogProps) {

  const { 
    t, 
    handleRestoreProduct 
  } = useProductRestoreDialog({
    product,
    onClose
  });

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
    >
      <DialogTitle>{t("common:labels.confirmRestore")}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 1 }}>
          {t("common:labels.confirmRestoreMessage")}
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
          color="primary" 
          onClick={handleRestoreProduct}
        >
          {t("common:actions.restore")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductRestoreDialog;
