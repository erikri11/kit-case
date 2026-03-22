import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import type { Customer } from '@features/customers/models/customer.model';
import { dateRenderer } from '../../../../shared/renderers/dateRenderer';
import { CustomerStatusChipRenderer } from '../renderers/CustomerStatusChipRenderer';
import { customerStatusRankCompare } from '@features/customers/components/comparators/customerStatusRankCompare';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconRenderer } from '../renderers/IconRenderer';
import { LinearProgressRenderer } from '../renderers/LinearProgressRenderer';
import { createActionButtonRenderer } from '../../../../shared/renderers/createActionButtonRenderer';
import { CustomerRenderer } from '@shared/renderers/CustomerRenderer';

interface ColumnArgsProps {
  t: TFunction;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onOpenDetails: (customer: Customer) => void;
}

export function createCustomerGridColumns({ 
  t, 
  onEdit,
  onDelete,
  onOpenDetails
}: ColumnArgsProps): ColDef<Customer>[] {

  const editRenderer = createActionButtonRenderer<Customer>({
    icon: EditIcon,
    iconButtonProps: { color: 'default' },
    title: t("common:actions.edit"),
    onAction: onEdit
  });

  const deleteRenderer = createActionButtonRenderer<Customer>({
    icon: DeleteIcon,
    iconButtonProps: { color: 'error' },
    title: t("common:actions.delete"),
    onAction: onDelete
  });

  return [
    {
      field: "name",
      headerName: t("common:labels.customer"),
      minWidth: 350,
      flex: 4,
      cellRenderer: CustomerRenderer
    },
    {
      field: "phone",
      headerName: t("common:labels.phone"),
      minWidth: 140,
      flex: 2,
      type: "rightAligned"
    },
    {
      field: "quota",
      headerName: t("common:labels.quota"),
      minWidth: 140,
      flex: 2,
      cellRenderer: LinearProgressRenderer
    },
    {
      field: "status",
      headerName: t("common:labels.status"),
      minWidth: 160,
      flex: 1,
      cellRenderer: CustomerStatusChipRenderer,
      comparator: customerStatusRankCompare
    },
    {
      field: "createdAt",
      headerName: t("common:labels.createdAt"),
      minWidth: 160,
      flex: 1,
      type: "rightAligned",
      cellRenderer: dateRenderer
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
    },
    {
      headerName: '',
      minWidth: 100,
      flex: 1,
      type: "rightAligned",
      filter: false,
      cellRenderer: IconRenderer,
      cellRendererParams: {
        onOpenDetails
      } 
    }
  ];
}
