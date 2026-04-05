import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createActionButtonRenderer } from '@shared/renderers/createActionButtonRenderer';
import type { Product } from '@features/products/models/product.model';
import { ImageRenderer } from '../renderers/ImageRenderer';
import { formatCurrency } from '@shared/utils/formatCurrency';

interface ColumnArgsProps {
  t: TFunction;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function createProductGridColumns({ 
  t, 
  onEdit,
  onDelete
}: ColumnArgsProps): ColDef<Product>[] {

  const editRenderer = createActionButtonRenderer<Product>({
    icon: EditIcon,
    iconButtonProps: { color: 'default' },
    title: t("common:actions.edit"),
    onAction: onEdit
  });

  const deleteRenderer = createActionButtonRenderer<Product>({
    icon: DeleteIcon,
    iconButtonProps: { color: 'error' },
    title: t("common:actions.delete"),
    onAction: onDelete
  });

  return [
    {
      field: "name",
      headerName: t("common:labels.name"),
      minWidth: 180,
      flex: 2,
      cellRenderer: 'agGroupCellRenderer'
    },
    {
      field: "image",
      headerName: t("common:labels.image"),
      minWidth: 160,
      flex: 1,
      cellRenderer: ImageRenderer,
      valueFormatter: () => ""
    },
    {
      field: "quantity",
      headerName: t("common:labels.quantity"),
      minWidth: 160,
      flex: 1,
      type: "rightAligned"
    },
    {
      field: "price",
      headerName: t("common:labels.price"),
      minWidth: 160,
      flex: 1,
      type: "rightAligned",
      valueFormatter: (params) =>
        formatCurrency(params.value, params.data?.currency ?? "USD")
    },
    {
      field: "status",
      headerName: t("common:labels.status"),
      minWidth: 160,
      flex: 1
    },
    {
      headerName: '',
      minWidth: 100,
      flex: 1,
      type: "rightAligned",
      filter: false,
      cellRenderer: editRenderer
    },
    {
      headerName: '',
      minWidth: 100,
      flex: 1,
      type: "rightAligned",
      filter: false,
      cellRenderer: deleteRenderer
    }
  ];
}
