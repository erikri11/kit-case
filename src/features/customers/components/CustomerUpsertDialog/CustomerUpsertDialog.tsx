import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CustomerCreate, CustomerUpdate } from "@features/customers/models/customer";
import type { Mode } from "@features/customers/models/mode";
import { CustomersApi } from "@features/customers/api/customersApi";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { validateEmail, validateName, validatePhone } from "@features/customers/validation/validateCustomer";
import type { FieldName } from "@features/customers/models/fieldName";
import { AvatarUpload } from "../AvatarUpload/AvatarUpload";

export interface CustomerUpsertDialogProps {
  open: boolean;
  onClose: () => void;
  mode: Mode;
  customerId?: string;
  initialCustomer?: CustomerUpdate
}

export function CustomerUpsertDialog({ 
  open, 
  onClose, 
  mode,
  customerId,
  initialCustomer
}: CustomerUpsertDialogProps) {

  const { t } = useTranslation('customers');
  const { setSnackbarMessage } = useSnackbar();

  const [name, setName] = useState<string>(initialCustomer?.name ?? '');
  const [email, setEmail] = useState<string>(initialCustomer?.email ?? '');
  const [phone, setPhone] = useState<string>(initialCustomer?.phone ?? '');
  const [quota, setQuota] = useState<number>(initialCustomer?.quota ?? 0);
  const [status, setStatus] = useState<string>(initialCustomer?.status ?? 'Pending');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false, 
    email: false, 
    phone: false 
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);
  
  const canSubmit = !nameError && !emailError && !phoneError;

  const showNameError = !!nameError && (touched.name || submitted);
  const showEmailError = !!emailError && (touched.email || submitted);
  const showPhoneError = !!phoneError && (touched.phone || submitted);

  const handleUpsertCustomer = async () => { 
    setSubmitted(true);
    if (!canSubmit) return;

    try {
      if (mode === 'add') {
         const payload: CustomerCreate = { 
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          avatarUrl: avatarUrl ?? undefined,
        };

        await CustomersApi.post(payload);
        console.log('Adding customer:', payload);
        setSnackbarMessage({ 
          content: t("customers:snackbar.addSuccess"), 
          type: "success" 
        });
      } else if (mode === 'edit' && customerId) {
        const payload: CustomerUpdate = {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          quota: quota,
          status: status as CustomerUpdate['status'],
          avatarUrl: avatarUrl ?? undefined,
        };
        
        await CustomersApi.put(customerId, payload);
        console.log('Updating customer:', payload);
        setSnackbarMessage({ 
          content: t("customers:snackbar.editSuccess"), 
          type: "success" 
        });
      }
      onClose();
    } catch (error) {
      console.error('Error upserting customer:', error);
      setSnackbarMessage({ 
        content: t("customers:snackbar.editError"), 
        type: "error" 
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      slotProps={{
        transition: {
          onEnter: () => {
            const existingAvatar = (
              initialCustomer as CustomerUpdate 
                & { avatar?: string | null })?.avatar ?? null;
            setAvatarUrl(existingAvatar);
            setAvatarPreview(null);
          }
        }
      }}
    >
      <DialogTitle>
        {mode === 'add' ? t('customers:actions.add') : t('customers:actions.edit')}
      </DialogTitle>
      <DialogContent className='pt-3'>
        <Grid container spacing={2}>

          <AvatarUpload
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
          />

          <Grid size={12}>
            <TextField 
              label="Name" 
              variant="filled" 
              fullWidth 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                name: true 
              }))}
              error={showNameError}
              helperText={showNameError ? nameError : ''}
            />
          </Grid>
          <Grid size={6}>
            <TextField 
              label="Email" 
              variant="filled" 
              fullWidth 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                email: true 
              }))}
              error={showEmailError}
              helperText={showEmailError ? emailError : ''}
            />
          </Grid>
          <Grid size={6}>
            <TextField 
              label="Phone" 
              variant="filled" 
              fullWidth 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                phone: true 
              }))}
              error={showPhoneError}
              helperText={showPhoneError ? phoneError : ''}
            />
          </Grid>

          {mode === 'edit' && (
            <>
              <Grid size={6}>
                <FormControl 
                  variant="filled" 
                  fullWidth
                >
                  <InputLabel>Quota</InputLabel>
                  <Select
                    value={quota}
                    label="Quota"
                    onChange={(e) => setQuota(e.target.value)}
                    renderValue={(value) => `${value}%`}
                  >
                    <MenuItem value={0}>0%</MenuItem>
                    <MenuItem value={50}>50%</MenuItem>
                    <MenuItem value={100}>100%</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl 
                  variant="filled" 
                  fullWidth
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                    renderValue={(value) => value}
                  >
                    <MenuItem value={'Active'}>Active</MenuItem>
                    <MenuItem value={'Pending'}>Pending</MenuItem>
                    <MenuItem value={'Blocked'}>Blocked</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="outlined" 
          onClick={onClose}
        >
          {t('common:cancel')}
        </Button>
        <Button 
          variant="contained" 
          onClick={handleUpsertCustomer} 
          disabled={!canSubmit}
        >
          {mode === 'add' ? t('common:add') : t('common:save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
