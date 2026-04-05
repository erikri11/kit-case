import { useState } from "react";
import { useTranslation } from "react-i18next";
import { productApi } from "@features/products/api/productApi";
import type { Currency, Product, ProductCategory, ProductCreate, ProductFieldName, ProductStatus, ProductType, ProductUpdate } from "@features/products/models/product.model";
import type { ProductImageState } from "@features/products/models/productImageState.model";
import { validateName, validatePrice, validateQuantity } from "@features/products/validation/validateProduct";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import type { Mode } from "@shared/types/mode";
import { productUploadApi } from "@features/products/api/productUploadApi";

export interface ProductUpsertDialogProps {
  mode: Mode;
  initialProduct?: Product;
  productId?: string;
  onClose: () => void;
}

export function useProductUpsertDialog({ 
  mode, 
  initialProduct, 
  productId, 
  onClose 
}: ProductUpsertDialogProps) {
  const { t } = useTranslation(["products", "common"]);
  const { setSnackbarMessage } = useSnackbar();

  // ---------------- STATE ----------------

  const [name, setName] = useState<string>(initialProduct?.name ?? "");
  const [productNumber, setProductNumber] = useState<string>(initialProduct?.productNumber ?? "");
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

  const [image, setImage] = useState<ProductImageState | null>(
    initialProduct?.image
      ? {
          id: "existing-image",
          url: initialProduct.image.url,
          fileName: initialProduct.image.fileName
        }
      : null
  );

  // ---------------- VALIDATION ----------------

  const nameError = validateName(name);
  const categoryError = !category ? "common:validation.categoryRequired" : undefined;
  const typeError = !type ? "common:validation.typeRequired" : undefined;
  const quantityError = validateQuantity(quantity);
  const currencyError = !currency ? "common:validation.currencyRequired" : undefined;
  const priceError = validatePrice(price);

  const showNameError = !!nameError && (touched.name || submitted);
  const showCategoryError = !!categoryError && (touched.category || submitted);
  const showTypeError = !!typeError && (touched.type || submitted);
  const showQuantityError = !!quantityError && (touched.quantity || submitted);
  const showCurrencyError = !!currencyError && (touched.currency || submitted);
  const showPriceError = !!priceError && (touched.price || submitted);

   const canSubmit = 
    !nameError && 
    !categoryError && 
    !typeError && 
    !quantityError && 
    !currencyError && 
    !priceError;

  // ---------------- SUBMIT ----------------

  const handleUpsertProduct = async () => { 
    setSubmitted(true);
    if (!canSubmit) return;

    try {
      let imageData: Product["image"] = initialProduct?.image ?? null;

        if (image?.file) {
          const uploadedImage = await productUploadApi(image.file);
          imageData = {
            url: uploadedImage.url,
            fileName: uploadedImage.originalName,
          };
        } else if (!image) {
          imageData = null;
        }

      if (mode === "add") {
          const payload: ProductCreate = { 
          name: name.trim(),
          image: imageData,
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
          image: imageData,
          category: category as ProductCategory,
          type: type as ProductType,
          currency: currency as Currency,
          price: Number(price),
          quantity: Number(quantity),
          status
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

  // ---------------- IMAGE HANDLING ----------------

  const handleImageDrop = async (files: File[]) => {
    if (files.length === 0) return;

    if (image?.file && image.url.startsWith("blob:")) {
      URL.revokeObjectURL(image.url);
    }

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setImage({
      id: `IMG-${Date.now()}`,
      url: previewUrl,
      fileName: file.name,
      file
    });
  };

  const handleImageRemove = () => {
    if (image?.file && image.url.startsWith("blob:")) {
      URL.revokeObjectURL(image.url);
    }
    setImage(null);
  };

  // ---------------- RETURN ----------------

  return {
    t,
    name,
    productNumber,
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
    setProductNumber,
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
  };
}
