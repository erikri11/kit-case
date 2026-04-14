import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createActionButtonRenderer } from '@shared/renderers/createActionButtonRenderer';
import type { Product } from '@features/products/models/product.model';
import { ImageRenderer } from '../renderers/ImageRenderer';
import ProductStatusChipRenderer from '../renderers/ProductStatusChipRenderer';
import { productRankStatusesCompare } from '@features/products/comperators/productRankStatusesCompare';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import type { Currency } from '@features/products/models/product.constants';
import { formatPrice } from '@shared/utils/formatPrice';

interface ColumnArgsProps {
  t: TFunction;
  language: string;
  displayCurrency: Currency;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onRestore: (product: Product) => void;
}

export function createProductGridColumns({ 
  t, 
  language,
  displayCurrency,
  onEdit,
  onDelete,
  onRestore
}: ColumnArgsProps): ColDef<Product>[] {

  const editRenderer = createActionButtonRenderer<Product>({
    icon: EditIcon,
    iconButtonProps: { color: 'default' },
    title: t("common:actions.edit"),
    isDisabled: (params) => params.data?.status === "Archived",
    onAction: onEdit
  });

  const deleteRenderer = createActionButtonRenderer<Product>({
    icon: DeleteIcon,
    iconButtonProps: { color: 'error' },
    title: t("common:actions.delete"),
    isDisabled: (params) => params.data?.status === "Published",
    isVisible: (params) => params.data?.status !== "Archived",
    onAction: onDelete
  });

  const restoreRenderer = createActionButtonRenderer<Product>({
    icon: RestoreFromTrashIcon,
    iconButtonProps: { color: "success" },
    title: t("common:actions.restore"),
    isDisabled: () => false,
    isVisible: (params) => params.data?.status === "Archived",
    onAction: onRestore
  });

  return [
    {
      field: "name",
      headerName: t("common:labels.name"),
      minWidth: 350,
      flex: 2,
      cellRenderer: 'agGroupCellRenderer'
    },
    {
      field: "image",
      headerName: t("common:labels.image"),
      minWidth: 150,
      flex: 1,
      cellRenderer: ImageRenderer,
      valueFormatter: () => ""
    },
    {
      field: "quantity",
      headerName: t("common:labels.quantity"),
      minWidth: 150,
      flex: 1,
      type: "rightAligned"
    },
    {
      field: "price",
      headerName: t("common:labels.price"),
      minWidth: 150,
      flex: 1,
      type: "rightAligned",
      valueFormatter: (params) =>
        formatPrice(
          params.value,
          params.data?.currency ?? "USD",
          displayCurrency,
          language
        )
    },
    {
      field: "status",
      headerName: t("common:labels.status"),
      minWidth: 150,
      flex: 1,
      cellRenderer: ProductStatusChipRenderer,
      comparator: productRankStatusesCompare
    },
    {
      headerName: t("common:actions.edit"),
      minWidth: 100,
      flex: 1,
      headerClass: "ag-header-center",
      filter: false,
      cellRenderer: editRenderer
    },
    {
      headerName: t("common:actions.delete"),
      minWidth: 100,
      flex: 1,
      headerClass: "ag-header-center",
      filter: false,
      cellRenderer: deleteRenderer
    },
    {
      headerName: t("common:actions.restore"),
      minWidth: 100,
      flex: 1,
      headerClass: "ag-header-center",
      filter: false,
      cellRenderer: restoreRenderer
    }
  ];
}
