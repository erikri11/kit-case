import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import type { CustomerUpdate } from "@features/customers/models/customer.model";
import type { Mode } from "@shared/types/mode";
import { AvatarUpload } from "../AvatarUpload/AvatarUpload";
import { PhoneMaskInput } from "../PhoneMaskInput/PhoneMaskInput";
import { useCustomerUpsertDialog } from "./useCustomerUpsertDialog";

export interface CustomerUpsertDialogProps {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  customerId?: string;
  initialCustomer?: CustomerUpdate;
}

export function CustomerUpsertDialog({ 
  open, 
  mode,
  customerId,
  initialCustomer,
  onClose
}: CustomerUpsertDialogProps) {
  
  const {
    t,
    name,
    email,
    phone,
    quota,
    status,
    avatar,
    avatarPreview,
    canSubmit,
    nameError,
    emailError,
    phoneError,
    showNameError,
    showEmailError,
    showPhoneError,
    setName,
    setEmail,
    setPhone,
    setQuota,
    setStatus,
    setAvatar,
    setAvatarPreview,
    setTouched,
    handleUpsertCustomer
  } = useCustomerUpsertDialog(
    mode, 
    onClose, 
    customerId, 
    initialCustomer
  );

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
            setAvatar(existingAvatar);
            setAvatarPreview(null);
          }
        }
      }}
    >
      <DialogTitle>
        {mode === "add" ? t("customers:actions.add") : t("customers:actions.edit")}
      </DialogTitle>
      <DialogContent className="pt-3">
        <Grid container spacing={2}>
          <AvatarUpload
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
            avatar={avatar}
            setAvatar={setAvatar}
          />
          <Grid size={12}>
            <TextField 
              label={t("common:labels.name")}
              variant="filled" 
              fullWidth 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                name: true 
              }))}
              error={showNameError}
              helperText={showNameError && nameError ? t(nameError) : ""}
            />
          </Grid>
          <Grid size={12}>
            <TextField 
              label={t("common:labels.email")}
              variant="filled" 
              fullWidth 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                email: true 
              }))}
              error={showEmailError}
              helperText={showEmailError && emailError ? t(emailError) : ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField 
              label={t("common:labels.phone")}
              variant="filled" 
              fullWidth 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                phone: true 
              }))}
              error={showPhoneError}
              helperText={showPhoneError && phoneError ? t(phoneError) : ""}
              slotProps={{
                input: {
                  inputComponent: PhoneMaskInput
                }
              }}
            />
          </Grid>
          {mode === "edit" && (
            <>
              <Grid size={6}>
                <FormControl 
                  variant="filled" 
                  fullWidth
                >
                  <InputLabel>{t("common:labels.quota")}</InputLabel>
                  <Select
                    value={quota}
                    label={t("common:labels.quota")}
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
                  <InputLabel>{t("common:labels.status")}</InputLabel>
                  <Select
                    value={status}
                    label={t("common:labels.status")}
                    onChange={(e) => setStatus(e.target.value)}
                    renderValue={(value) => t(`customers:status.${value}`)}
                  >
                    <MenuItem value={"Active"}>{t("customers:status.Active")}</MenuItem>
                    <MenuItem value={"Pending"}>{t("customers:status.Pending")}</MenuItem>
                    <MenuItem value={"Blocked"}>{t("customers:status.Blocked")}</MenuItem>
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
          {t("common:actions.cancel")}
        </Button>
        <Button 
          variant="contained" 
          onClick={handleUpsertCustomer} 
          disabled={!canSubmit}
        >
          {mode === "add" ? t("common:actions.add") : t("common:actions.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomerUpsertDialog;