import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { theme } from '@shared/theme/mui/theme';
import { useSnackbar } from '@shared/context/snackbar/useSnackbar';
import type { Customer } from '@features/customers/models/customer.model';
import { CustomersApi } from '@features/customers/api/customersApi';

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

  const { t } = useTranslation(['common', 'customers']);
  const { setSnackbarMessage } = useSnackbar();
  
  const handleDeleteCustomer = async () => { 
    try {
      if (customer?.id) {
        await CustomersApi.delete(customer.id);
        // TODO:: Remove after testing
        console.log('Deleting customer with id:', customer.id);
        setSnackbarMessage({ content: t("customers:snackbar.deleteSuccess"), type: "success" });
      }
      onClose();
    } catch (error) {
      // TODO:: Remove after testing
      console.error('Error deleting customer:', error);
      setSnackbarMessage({ content: t("customers:snackbar.deleteError"), type: "error" });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
    >
      <DialogTitle>{t('common:confirmDelete')}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 1 }}>
          {t('common:confirmDeleteMessage')}
          </Typography>
        <Typography sx={{ mt: 1 }} color={theme.typography.subtitle2.color}>
          {customer?.name}
          </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t('common:cancel')}
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDeleteCustomer}
        >
          {t('common:delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomerDeleteDialog;
