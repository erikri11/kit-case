import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,FormControl,FormHelperText,Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import type { Mode } from "@shared/types/mode";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import type { Currency, Product, ProductCategory, ProductCreate, ProductFieldName, ProductStatus, ProductType, ProductUpdate } from "@features/products/models/product.model";
import { validateName, validatePrice, validateQuantity } from "@features/products/validation/validateProduct";
import { productApi } from "@features/products/api/productApi";

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

  const { t } = useTranslation(["products", "common"]);
  const { setSnackbarMessage } = useSnackbar();

  const [name, setName] = useState<string>(initialProduct?.name ?? "");
  const [category, setCategory] = useState<ProductCategory | "">(initialProduct?.category ?? "");
  const [type, setType] = useState<ProductType | "">(initialProduct?.type ?? "");
  const [quantity, setQuantity] = useState<string>(initialProduct?.quantity != null ? String(initialProduct.quantity) : "");
  const [currency, setCurrency] = useState<Currency | "">(initialProduct?.currency ?? "");
  const [price, setPrice] = useState<string>(initialProduct?.price != null ? String(initialProduct.price) : "");
  const sku = initialProduct?.sku ?? "";
  const [status, setStatus] = useState<ProductStatus>(initialProduct?.status ?? "Draft");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [touched, setTouched] = useState<Record<ProductFieldName, boolean>>({ 
    name: false, 
    image: false, 
    category: false, 
    type: false, 
    quantity: false, 
    currency: false, 
    price: false,
    status: false 
  });

  const nameError = validateName(name);
  const categoryError = !category ? "common:validation.categoryRequired" : undefined;
  const typeError = !type ? "common:validation.typeRequired" : undefined;
  const quantityError = validateQuantity(quantity);
  const currencyError = !currency ? "common:validation.currencyRequired" : undefined;
  const priceError = validatePrice(price);

  const canSubmit = 
    !nameError && 
    !categoryError && 
    !typeError && 
    !quantityError && 
    !currencyError && 
    !priceError;
  
  const showNameError = !!nameError && (touched.name || submitted);
  const showCategoryError = !!categoryError && (touched.category || submitted);
  const showTypeError = !!typeError && (touched.type || submitted);
  const showQuantityError = !!quantityError && (touched.quantity || submitted);
  const showCurrencyError = !!currencyError && (touched.currency || submitted);
  const showPriceError = !!priceError && (touched.price || submitted);

  const handleUpsertProduct = async () => { 
    setSubmitted(true);
    if (!canSubmit) return;

    try {
      if (mode === "add") {
          const payload: ProductCreate = { 
          name: name.trim(),
          image: null, 
          category: category as ProductCategory,
          type: type as ProductType, 
          quantity: Number(quantity),
          currency: currency as Currency,
          price: Number(price),
          status: "Draft"
        };

        await productApi.post(payload);

        setSnackbarMessage({ 
          content: t("products:snackbar.addSuccess"), 
          type: "success" 
        });
      } else if (mode === "edit") {
        if (!productId) return;

        const payload: ProductUpdate = {
          name: name.trim(),
          image: null,
          category: category as ProductCategory,
          type: type as ProductType,
          currency: currency as Currency,
          price: Number(price),
          quantity: Number(quantity),
          status: status
        };

        await productApi.put(productId, payload);
        
        setSnackbarMessage({ 
          content: t("products:snackbar.updateSuccess"), 
          type: "success" 
        });
      }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error updating product:", errorMessage);

      setSnackbarMessage({
      content:
        mode === "add"
          ? t("products:snackbar.addError")
          : t("products:snackbar.updateError"),
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
                  displayEmpty
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

        {/* Image upload field to be implemented */}
        {/* <Stack spacing={3}>
          <Typography variant="h6">Images</Typography>
          <Card sx={{ borderRadius: 1 }} variant="outlined">
            <DataTable<Image> columns={getImageColumns({ onRemove: handleImageRemove })} rows={images} />
            {images.length === 0 ? (
              <Box sx={{ p: 1 }}>
                <Typography align="center" color="text.secondary" variant="body2">
                  No images
                </Typography>
              </Box>
            ) : null}
          </Card>
          <FileDropzone
            accept={{ "image/*": [] }}
            caption="(SVG, JPG, PNG, or gif maximum 900x400)"
            onDrop={handleImageDrop}
          />
        </Stack> */}

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





// function getImageColumns({ onRemove }: { onRemove?: (imageId: string) => void }): ColumnDef<Image>[] {
// 	return [
// 		{
// 			formatter: (row): React.JSX.Element => {
// 				return (
// 					<Box
// 						sx={{
// 							backgroundImage: `url(${row.url})`,
// 							backgroundPosition: "center",
// 							backgroundSize: "cover",
// 							bgcolor: "var(--mui-palette-background-level2)",
// 							borderRadius: 1,
// 							flex: "0 0 auto",
// 							height: "40px",
// 							width: "40px",
// 						}}
// 					/>
// 				);
// 			},
// 			name: "Image",
// 			width: "100px",
// 		},
// 		{ field: "fileName", name: "File name", width: "300px" },
// 		{
// 			formatter: (row): React.JSX.Element => (
// 				<IconButton
// 					onClick={() => {
// 						onRemove?.(row.id);
// 					}}
// 				>
// 					<TrashIcon />
// 				</IconButton>
// 			),
// 			name: "Actions",
// 			hideName: true,
// 			width: "100px",
// 			align: "right",
// 		},
// 	];
// }





// const handleImageDrop = React.useCallback(
// 		async (files: File[]) => {
// 			// Upload images to the server

// 			const images = await Promise.all(
// 				files.map(async (file) => {
// 					const url = await fileToBase64(file);

// 					return { id: `IMG-${Date.now()}`, url, fileName: file.name };
// 				})
// 			);

// 			setValue("images", [...getValues("images"), ...images]);
// 		},
// 		[getValues, setValue]
// 	);

// 	const handleImageRemove = React.useCallback(
// 		(imageId: string) => {
// 			setValue(
// 				"images",
// 				getValues("images").filter((image) => image.id !== imageId)
// 			);
// 		},
// 		[getValues, setValue]
// 	);