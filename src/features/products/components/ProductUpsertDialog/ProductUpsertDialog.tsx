import { Button, Dialog, DialogActions, DialogContent, DialogTitle,FormControl,FormHelperText,Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Currency, Product, ProductCategory, ProductStatus, ProductType } from "@features/products/models/product.model";
import { useProductUpsertDialog } from "./useProductUpsertDialog";
import type { Mode } from "@shared/types/mode";
import { FileDropzone } from "@shared/utils/FileDropzone";
import { resolveImageUrl } from "@shared/utils/resolveImageUrl";

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
    name,
    category,
    type,
    quantity,
    currency,
    price,
    sku,
    status,
    nameError,
    categoryError,
    typeError,
    quantityError,
    currencyError,
    priceError,
    showNameError,
    showCategoryError,
    showTypeError,
    showQuantityError,
    showCurrencyError,
    showPriceError,
    image,
    canSubmit,
    setName,
    setCategory,
    setType,
    setQuantity,
    setCurrency,
    setPrice,
    setStatus,
    setTouched,
    handleUpsertProduct,
    handleImageDrop,
    handleImageRemove
  } = useProductUpsertDialog({
    mode, 
    initialProduct,
     productId, 
     onClose
  });
    
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

          <Grid size={6}>
            <FormControl
              variant="filled"
              fullWidth
              error={showCategoryError}
            >
              <InputLabel>{t("common:labels.category")}</InputLabel>
              <Select
                value={category}
                label={t("common:labels.category")}
                displayEmpty
                renderValue={(value) => (value ? t(`products:category.${value}`) : "")}
                onChange={(e) => {
                  setCategory(e.target.value as ProductCategory | "");
                  setTouched((prev) => ({
                    ...prev,
                    category: true,
                  }));
                }}
                onClose={() =>
                  setTouched((prev) => ({
                    ...prev,
                    category: true,
                  }))
                }
              >
                <MenuItem value={"Healthcare"}>{t("products:category.Healthcare")}</MenuItem>
                <MenuItem value={"Makeup"}>{t("products:category.Makeup")}</MenuItem>
                <MenuItem value={"Skincare"}>{t("products:category.Skincare")}</MenuItem>
              </Select>
              <FormHelperText>{showCategoryError && categoryError ? t(categoryError) : ""}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl
              variant="filled"
              fullWidth
              error={showTypeError}
            >
              <InputLabel>{t("common:labels.type")}</InputLabel>
              <Select
                value={type}
                label={t("common:labels.type")}
                displayEmpty
                renderValue={(value) => (
                  value ? t(`products:type.${value}`) : ""
                )}
                onChange={(e) => {
                  setType(e.target.value as ProductType | "");
                  setTouched((prev) => ({
                    ...prev,
                    type: true
                  }));
                }}
                onClose={() =>
                  setTouched((prev) => ({
                    ...prev,
                    type: true
                  }))
                }
              >
                <MenuItem value={"Physical"}>{t("products:type.Physical")}</MenuItem>
                <MenuItem value={"Digital"}>{t("products:type.Digital")}</MenuItem>
                <MenuItem value={"Service"}>{t("products:type.Service")}</MenuItem>
              </Select>
              <FormHelperText>{showTypeError && typeError ? t(typeError) : ""}</FormHelperText>
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
              error={showCurrencyError}
            >
              <InputLabel>{t("common:labels.currency")}</InputLabel>
              <Select
                value={currency}
                label={t("common:labels.currency")}
                displayEmpty
                renderValue={(value) => (
                  value ? t(`products:currency.${value}`) : ""
                )}
                onChange={(e) => {
                  setCurrency(e.target.value as Currency | "");
                  setTouched((prev) => ({
                    ...prev,
                    currency: true
                  }));
                }}
                onClose={() =>
                  setTouched((prev) => ({
                    ...prev,
                    currency: true
                  }))
                }
              >
                <MenuItem value={"USD"}>{t("products:currency.USD")}</MenuItem>
                <MenuItem value={"EUR"}>{t("products:currency.EUR")}</MenuItem>
                <MenuItem value={"NOK"}>{t("products:currency.NOK")}</MenuItem>
              </Select>
              <FormHelperText>{showCurrencyError && currencyError ? t(currencyError) : ""}</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid size={6}>
            <TextField
              label={t("common:labels.price")}
              variant="filled" 
              fullWidth
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                price: true 
              }))}
              error={showPriceError}
              helperText={showPriceError && priceError ? t(priceError) : ""}
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
                  value={status}
                  label={t("common:labels.status")}
                  renderValue={(value) => (
                    value ? t(`products:status.${value}`) : ""
                  )}
                  onChange={(e) => {
                    setStatus(e.target.value as ProductStatus);
                    setTouched((prev) => ({
                      ...prev,
                      status: true
                    }));
                  }}
                  onClose={() =>
                    setTouched((prev) => ({
                      ...prev,
                      status: true
                    }))
                  }
                >
                  <MenuItem value={"Draft"}>{t("products:status.Draft")}</MenuItem>
                  <MenuItem value={"Published"}>{t("products:status.Published")}</MenuItem>
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
                  onClick={handleImageRemove}
                >
                  <DeleteIcon sx={{ mr: 1 }} />
                  {t("common:actions.remove")}
                </Button>
              </Stack>
            </Stack>
          )}
          <FileDropzone
            accept={{
              "image/png": [],
              "image/jpeg": [],
              "image/gif": [],
              "image/svg+xml": []
            }}
            maxFiles={1}
            caption="(SVG, JPG, PNG or GIF - max 900x400 px)"
            onDrop={handleImageDrop}
          />
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
                value={sku}
                disabled
              />
            </Grid>
          )}
          <Grid size={6}>
            <TextField
              label={t("common:labels.quantity")}
              variant="filled" 
              fullWidth
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                quantity: true 
              }))}
              error={showQuantityError}
              helperText={showQuantityError && quantityError ? t(quantityError) : ""}
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
          onClick={handleUpsertProduct} 
          disabled={!canSubmit}
        >
          {mode === "add" ? t("common:actions.add") : t("common:actions.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductUpsertDialog;