import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createOrderGridColumns } from "./createOrderGridColumns";
import { OrderUpsertDialog } from "../OrderUpsertDialog/OrderUpsertDialog";
import { OrderDeleteDialog } from "../OrderDeleteDialog/OrderDeleteDialog";
import type { OrderDetails } from "@features/orders/models/model/order.details.model";
import OrderDetailRenderer from "../renderers/OrderDetailsRenderer";

interface OrdersGridProps {
  orders: OrderDetails[];
}

export function OrdersGrid({ orders }: OrdersGridProps) {
  const { t } = useTranslation("orders");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [updateOrder, setUpdateOrder] = useState<OrderDetails | undefined>();
  const [deleteOrder, setDeleteOrder] = useState<OrderDetails | undefined>();

  const headers = createOrderGridColumns({ 
    t,
    onEdit: setUpdateOrder,
    onDelete: setDeleteOrder
  });

  return (
    <>
      <DataGridTable<OrderDetails>
        data={orders} 
        headers={headers}
        isAddButtonVisible
        isPaginationEnabled
        addButtonLabel={t("orders:actions.add")}
        onAddButtonClick={() => setIsAddOpen(true)}
        expandComponent={OrderDetailRenderer}
      />

      {isAddOpen && (
        <OrderUpsertDialog
          open
          mode="add"
          onClose={() => setIsAddOpen(false)}
        />
      )}

      {updateOrder && (
        <OrderUpsertDialog
          open
          mode="edit"
          initialOrder={updateOrder}
          orderId={updateOrder.id}
          onClose={() => setUpdateOrder(undefined)}
        />
      )}

      {deleteOrder && (
        <OrderDeleteDialog
          open
          order={deleteOrder}
          onClose={() => setDeleteOrder(undefined)}
        />
      )}
    </>
  );
}

export default OrdersGrid;
