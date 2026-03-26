import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createActionButtonRenderer } from '@shared/renderers/createActionButtonRenderer';
import { OrderRenderer } from '../renderers/OrderRenderer';
import { PaymentMethodRenderer } from '../renderers/PaymentMethodRenderer';
import { OrderStatusChipRenderer } from '../renderers/OrderStatusChipRenderer';
import { orderStatusRankCompare } from '../comparators/orderStatusRankCompare';
import type { OrderDetails } from '@features/orders/models/order.details.model';
import OrderCustomerRenderer from '../renderers/OrderCustomerRenderer';

interface ColumnArgsProps {
  t: TFunction;
  onEdit: (order: OrderDetails) => void;
  onDelete: (order: OrderDetails) => void;
}

export function createOrderGridColumns({ 
  t,
  onEdit,
  onDelete
}: ColumnArgsProps): ColDef<OrderDetails>[] {

  const editRenderer = createActionButtonRenderer<OrderDetails>({
    icon: EditIcon,
    iconButtonProps: { color: 'default' },
    title: t("common:actions.edit"),
    onAction: onEdit
  });

  const deleteRenderer = createActionButtonRenderer<OrderDetails>({
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
      field: "customer.name",
      headerName: t("common:labels.customer"),
      minWidth: 350,
      flex: 4,
      cellRenderer: OrderCustomerRenderer
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
