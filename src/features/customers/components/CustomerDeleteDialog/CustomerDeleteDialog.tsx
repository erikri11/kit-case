import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { theme } from '@shared/theme/mui/theme';
import type { Customer } from '@features/customers/models/customer.model';
import { useCustomerDeleteDialog } from './useCustomerDeleteDialog';

export interface CustomerDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer;
}

export function CustomerDeleteDialog({
  open,
  onClose,
  customer
}: CustomerDeleteDialogProps) {
  
  const {t, handleDeleteCustomer} = useCustomerDeleteDialog(onClose, customer);

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
        <Typography sx={{ mt: 1 }} color={theme.typography.subtitle2.color}>
          {customer?.name}
          </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t("common:actions.cancel")}
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDeleteCustomer}
        >
          {t("common:actions.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomerDeleteDialog;
