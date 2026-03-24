import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createActionButtonRenderer } from '@shared/renderers/createActionButtonRenderer';
import type { Order } from '@features/orders/models/order.model';
import { OrderRenderer } from '../renderers/OrderRenderer';
import { PaymentMethodRenderer } from '../renderers/PaymentMethodRenderer';
import { CustomerRenderer } from '../../../../shared/renderers/CustomerRenderer';
import { OrderStatusChipRenderer } from '../renderers/OrderStatusChipRenderer';
import { orderStatusRankCompare } from '../comparators/orderStatusRankCompare';

interface ColumnArgsProps {
  t: TFunction;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
}

export function createOrderGridColumns({ 
  t,
  onEdit,
  onDelete
}: ColumnArgsProps): ColDef<Order>[] {

  const editRenderer = createActionButtonRenderer<Order>({
    icon: EditIcon,
    iconButtonProps: { color: 'default' },
    title: t("common:actions.edit"),
    onAction: onEdit
  });

  const deleteRenderer = createActionButtonRenderer<Order>({
    icon: DeleteIcon,
    iconButtonProps: { color: 'error' },
    title: t("common:actions.delete"),
    onAction: onDelete
  });

  return [
    {
      field: "issueDate",
      headerName: t("common:labels.order"),
      minWidth: 250,
      flex: 2,
      cellRenderer: OrderRenderer
    },
    {
      field: "paymentMethod.type",
      headerName: t("common:labels.paymentMethod"),
      minWidth: 200,
      flex: 2,
      cellRenderer: PaymentMethodRenderer
    },
    {
      field: "name",
      headerName: t("common:labels.customer"),
      minWidth: 350,
      flex: 4,
      cellRenderer: CustomerRenderer
    },
    {
      field: "status",
      headerName: t("common:labels.status"),
      minWidth: 160,
      flex: 1,
      cellRenderer: OrderStatusChipRenderer,
      comparator: orderStatusRankCompare
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
