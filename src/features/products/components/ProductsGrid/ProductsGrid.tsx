import { useState } from "react";
import { useTranslation } from "react-i18next";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import type { Product } from "@features/products/models/product.model";
import { createProductGridColumns } from "./createProductGridColumns";
import { ProductDetailRenderer } from "../renderers/ProductDetailRenderer";
import { ProductUpsertDialog } from "../ProductUpsertDialog/ProductUpsertDialog";
import ProductDeleteDialog from "../ProductDeleteDialog/ProductDeleteDialog";
import ProductRestoreDialog from "../ProductRestoreDialog/ProductRestoreDialog";
import i18n from "@shared/i18n/i18n";
import useCurrency from "@shared/context/currency/useCurrency";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const { t } = useTranslation();
  const { currency: displayCurrency } = useCurrency();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState<Product | undefined>();
  const [deleteProduct, setDeleteProduct] = useState<Product | undefined>();
  const [restoreProduct, setRestoreProduct] = useState<Product | undefined>();

  const headers = createProductGridColumns({ 
    t,
    language: i18n.language,
    displayCurrency,
    onEdit: setUpdateProduct,
    onDelete: setDeleteProduct,
    onRestore: setRestoreProduct
  });

  return (
    <>
      <DataGridTable<Product>
        data={products} 
        headers={headers}
        isAddButtonVisible
        isPaginationEnabled
        addButtonLabel={t("products:actions.add")}
        onAddButtonClick={() => setIsAddOpen(true)}
        expandComponent={ProductDetailRenderer}
      />

      {isAddOpen && (
        <ProductUpsertDialog
          open
          mode="add"
          onClose={() => setIsAddOpen(false)}
        />
      )}

      {updateProduct && (
        <ProductUpsertDialog
          open
          mode="edit"
          initialProduct={updateProduct}
          productId={updateProduct.id}
          onClose={() => setUpdateProduct(undefined)}
        />
      )}
      
      {deleteProduct && (
        <ProductDeleteDialog
          open
          product={deleteProduct}
          onClose={() => setDeleteProduct(undefined)}
        />
      )}
      
      {restoreProduct && (
        <ProductRestoreDialog
          open
          product={restoreProduct}
          onClose={() => setRestoreProduct(undefined)}
        />
      )}
    </>
  );
}

export default ProductsGrid;
