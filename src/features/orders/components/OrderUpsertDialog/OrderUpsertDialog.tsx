import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import type { Mode } from "@shared/types/mode";
import { useTranslation } from "react-i18next";

export interface OrderUpsertDialogProps {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  // customerId?: string;
  // initialCustomer?: OrderUpdate;
}

export function OrderUpsertDialog({ 
  open, 
  mode,
  // orderId,
  // initialOrder,
  onClose
}: OrderUpsertDialogProps) {

  const { t } = useTranslation("orders");
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
    >
      <DialogTitle>
        {mode === "add" ? t("orders:actions.add") : t("orders:actions.edit")}
      </DialogTitle>
      <DialogContent className="pt-3">
        <Grid container spacing={2}>
          
          <Grid size={12}>
            
          </Grid>

          <Grid size={12}>
            
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            
          </Grid>

          {mode === "edit" && (
            <>
              <Grid size={6}>
                
              </Grid>

              <Grid size={6}>
                
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
          // onClick={handleUpsertOrder} 
          // disabled={!canSubmit}
        >
          {mode === "add" ? t("common:actions.add") : t("common:actions.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
