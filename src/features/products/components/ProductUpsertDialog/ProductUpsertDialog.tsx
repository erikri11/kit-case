import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,FormControl,FormHelperText,Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "@features/products/models/product.model";
import { useProductUpsertDialog } from "./useProductUpsertDialog";
import type { Mode } from "@shared/types/mode";
import { FileDropzone } from "@shared/utils/FileDropzone";
import { resolveImageUrl } from "@shared/utils/resolveImageUrl";
import { CURRENCIES, PRODUCT_CATEGORIES, PRODUCT_STATUSES, PRODUCT_TYPES, type Currency, type ProductCategory, type ProductStatus, type ProductType } from "@features/products/models/product.constants";

export interface ProductUpsertDialogProps {
  open: boolean;
  mode: Mode;
  initialProduct?: Product;
  productId?: string;
  onClose: () => void;
}

export function ProductUpsertDialog({ 
  open, 
  mode,
  initialProduct,
  productId,
  onClose
}: ProductUpsertDialogProps) {
  
  const {
    t,
    form,
    errors,
    flags,
    image,
    actions
  } = useProductUpsertDialog({
    mode,
    initialProduct,
    productId,
    onClose
  });

  const types = form.category ? PRODUCT_TYPES[form.category] : [];

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
    >
      <DialogTitle>
        {mode === "add" ? t("products:actions.add") : t("products:actions.edit")}
      </DialogTitle>
      <DialogContent className="pt-3">
        <Typography variant="h4" sx={{ mb: 3 }}>
          {t("common:labels.basicInformation")}  
        </Typography>
        <Grid container spacing={2} sx={{mb: 3}}>
          <Grid size={12}>
            <TextField
              label={t("common:labels.productName")}
              variant="filled" 
              fullWidth
              value={form.name}
              onChange={(e) => actions.setName(e.target.value)}
              onBlur={() => actions.setTouched((prev) => ({ 
                ...prev, 
                name: true 
              }))}
              disabled={flags.isArchived}
              error={errors.showNameError}
              helperText={errors.showNameError && errors.nameError ? t(errors.nameError) : ""}
            />
          </Grid>
          {mode === 'edit' && (
            <Grid container size={12} spacing={2}>
              <Grid size={6}>
                <TextField
                  label={t("common:labels.productNumber")}
                  variant="filled"
                  fullWidth
                  value={form.productNumber}
                  disabled
                />
              </Grid>
            </Grid>
          )}
          <Grid size={6}>
            <FormControl
              variant="filled"
              fullWidth
              error={errors.showCategoryError}
            >
              <InputLabel>{t("common:labels.category")}</InputLabel>
              <Select
                value={form.category}
                label={t("common:labels.category")}
                displayEmpty
                renderValue={(value) => (value ? t(`products:category.${value}`) : "")}
                onChange={(e) => {
                  actions.setCategory(e.target.value as ProductCategory | "");
                  actions.setType("");
                  actions.setTouched((prev) => ({
                    ...prev,
                    category: true,
                  }));
                }}
                onClose={() =>
                  actions.setTouched((prev) => ({
                    ...prev,
                    category: true,
                  }))
                }
                disabled={flags.isPublished || flags.isArchived}
              >
                {PRODUCT_CATEGORIES.map((s) => (
                  <MenuItem  key={s} value={s}>
                    {t(`products:category.${s}`)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.showCategoryError && errors.categoryError ? t(errors.categoryError) : ""}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl
              variant="filled"
              fullWidth
              error={errors.showTypeError}
            >
              <InputLabel>{t("common:labels.type")}</InputLabel>
              <Select
                value={form.type}
                label={t("common:labels.type")}
                displayEmpty
                renderValue={(value) => (
                  value ? t(`products:type.${value}`) : ""
                )}
                onChange={(e) => {
                  actions.setType(e.target.value as ProductType | "");
                  actions.setTouched((prev) => ({
                    ...prev,
                    type: true
                  }));
                }}
                onClose={() =>
                  actions.setTouched((prev) => ({
                    ...prev,
                    type: true
                  }))
                }
                disabled={!form.category || flags.isPublished || flags.isArchived}
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(`products:type.${type}`)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.showTypeError && errors.typeError ? t(errors.typeError) : ""}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

         <Typography variant="h4" sx={{ mb: 3 }}>
          {t("common:labels.pricing")}  
        </Typography>

        <Grid container spacing={2} sx={{mb: 3}}>
          <Grid size={6}>
            <FormControl 
              variant="filled" 
              fullWidth
              error={errors.showCurrencyError}
            >
              <InputLabel>{t("common:labels.currency")}</InputLabel>
              <Select
                value={form.currency}
                label={t("common:labels.currency")}
                displayEmpty
                renderValue={(value) => (
                  value ? t(`products:currency.${value}`) : ""
                )}
                onChange={(e) => {
                  actions.setCurrency(e.target.value as Currency | "");
                  actions.setTouched((prev) => ({
                    ...prev,
                    currency: true
                  }));
                }}
                onClose={() =>
                  actions.setTouched((prev) => ({
                    ...prev,
                    currency: true
                  }))
                }
                disabled={flags.isPublished || flags.isArchived}
              >
                {CURRENCIES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {t(`products:currency.${s}`)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.showCurrencyError && errors.currencyError ? t(errors.currencyError) : ""}</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid size={6}>
            <TextField
              label={t("common:labels.price")}
              variant="filled" 
              fullWidth
              value={form.price}
              type="number"
              onChange={(e) => actions.setPrice(e.target.value)}
              onBlur={() => actions.setTouched((prev) => ({ 
                ...prev, 
                price: true 
              }))}
              disabled={flags.isArchived}
              error={errors.showPriceError}
              helperText={errors.showPriceError && errors.priceError ? t(errors.priceError) : ""}
            />
          </Grid>

          {mode === 'edit' && (
            <Grid size={6}>
              <FormControl 
                variant="filled" 
                fullWidth
              >
                <InputLabel>{t("common:labels.status")}</InputLabel>
                <Select
                  value={form.status}
                  label={t("common:labels.status")}
                  renderValue={(value) => (
                    value ? t(`products:status.${value}`) : ""
                  )}
                  onChange={(e) => {
                    actions.setStatus(e.target.value as ProductStatus);
                    actions.setTouched((prev) => ({
                      ...prev,
                      status: true
                    }));
                  }}
                  onClose={() =>
                    actions.setTouched((prev) => ({
                      ...prev,
                      status: true
                    }))
                  }
                >
                  {PRODUCT_STATUSES.map((s) => (
                  <MenuItem  key={s} value={s}>
                    {t(`products:status.${s}`)}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>

        <Typography variant="h4" sx={{ mb: 3 }}>
          {t("common:labels.images")}  
        </Typography>

        <Stack spacing={2} sx={{mb: 3}}>
          {image && (
            <Stack spacing={2}>
              <Stack spacing={1}>
                <img
                  src={resolveImageUrl(image.url)}
                  alt={image.fileName}
                  style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
                />
                <Typography variant="body2">{image.fileName}</Typography>
              </Stack>
              <Stack 
                spacing={1} 
                direction="row"
                justifyContent="flex-start" 
              >
                <Button 
                  color="error" 
                  variant="outlined" 
                  onClick={actions.handleImageRemove}
                  disabled={flags.isArchived}
                >
                  <DeleteIcon sx={{ mr: 1 }} />
                  {t("common:actions.remove")}
                </Button>
              </Stack>
            </Stack>
          )}
          <Box
            sx={
              flags.isArchived
                ? { pointerEvents: "none", opacity: 0.5 }
                : undefined
            }
          >
            <FileDropzone
              accept={{
                "image/png": [],
                "image/jpeg": [],
                "image/gif": [],
                "image/svg+xml": []
              }}
              maxFiles={1}
              caption="(SVG, JPG, PNG or GIF - max 900x400 px)"
              onDrop={actions.handleImageDrop}
              disabled={flags.isArchived}
            />
          </Box>
        </Stack>

        <Typography variant="h4" sx={{ mb: 3 }}>
          {t("common:labels.stockAndInventory")}  
        </Typography>

        <Grid container spacing={2} sx={{mb: 3}}>
          {mode === "edit" && (
            <Grid size={6}>
              <TextField
                label={t("common:labels.stockKeepingUnit")}
                variant="filled" 
                fullWidth
                value={form.sku}
                disabled
              />
            </Grid>
          )}
          <Grid size={6}>
            <TextField
              label={t("common:labels.quantity")}
              variant="filled" 
              fullWidth
              value={form.quantity}
              type="number"
              onChange={(e) => actions.setQuantity(e.target.value)}
              onBlur={() => actions.setTouched((prev) => ({ 
                ...prev, 
                quantity: true 
              }))}
              disabled={flags.isArchived}
              error={errors.showQuantityError}
              helperText={errors.showQuantityError && errors.quantityError ? t(errors.quantityError) : ""}
            />
          </Grid>
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
          onClick={actions.handleUpsertProduct} 
          disabled={!flags.canSubmit}
        >
          {mode === "add" ? t("common:actions.add") : t("common:actions.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductUpsertDialog;
