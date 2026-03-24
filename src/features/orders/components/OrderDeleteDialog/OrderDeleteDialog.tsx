import { orderApi } from '@features/orders/api/orderApi';
import type { Order } from '@features/orders/models/order.model';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useSnackbar } from '@shared/context/snackbar/useSnackbar';
import { useTranslation } from 'react-i18next';

export interface OrderDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  order?: Order;
}

export function OrderDeleteDialog({
  open,
  onClose,
  order
}: OrderDeleteDialogProps) {

  const { t } = useTranslation("orders");
   const { setSnackbarMessage } = useSnackbar();

  const handleDeleteOrder = async () => {
    try {
      if (order?.id) {
        await orderApi.delete(order.id);
        setSnackbarMessage({ 
          content: t("orders:snackbar.deleteSuccess"), 
          type: "success" 
        });
      }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to delete order:", errorMessage);

      setSnackbarMessage({ 
        content: t("orders:snackbar.deleteError"), 
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
          {order?.name}
          </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t("common:actions.cancel")}
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDeleteOrder}
        >
          {t("common:actions.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderDeleteDialog;
