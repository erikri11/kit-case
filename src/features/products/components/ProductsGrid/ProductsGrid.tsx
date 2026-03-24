import { useState } from "react";
import { useTranslation } from "react-i18next";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import type { Product } from "@features/products/models/product.model";
import { createProductGridColumns } from "./createProductGridColumns";
import { ProductDetailRenderer } from "../renderers/ProductDetailRenderer";
import { ProductUpsertDialog } from "../ProductUpsertDialog/ProductUpsertDialog";
import ProductDeleteDialog from "../ProductDeleteDialog/ProductDeleteDialog";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const { t } = useTranslation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState<Product | undefined>();
  const [deleteProduct, setDeleteProduct] = useState<Product | undefined>();

  const headers = createProductGridColumns({ 
    t,
    onEdit: setUpdateProduct,
    onDelete: setDeleteProduct
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
    </>
  );
}

export default ProductsGrid;
