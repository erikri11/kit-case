import type { Order } from "@features/orders/models/order.model";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createOrderGridColumns } from "./createOrderGridColumns";
import { OrderUpsertDialog } from "../OrderUpsertDialog/OrderUpsertDialog";
import { OrderDeleteDialog } from "../OrderDeleteDialog/OrderDeleteDialog";

interface OrdersGridProps {
  orders: Order[];
}

export function OrdersGrid({ orders }: OrdersGridProps) {
  const { t } = useTranslation("orders");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [updateOrder, setUpdateOrder] = useState<Order | undefined>();
  const [deleteOrder, setDeleteOrder] = useState<Order | undefined>();

  const headers = createOrderGridColumns({ 
    t,
    onEdit: setUpdateOrder,
    onDelete: setDeleteOrder
  });

  return (
    <>
      <DataGridTable<Order>
        data={orders} 
        headers={headers}
        isAddButtonVisible
        isPaginationEnabled
        addButtonLabel={t("orders:actions.add")}
        onAddButtonClick={() => setIsAddOpen(true)}
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
