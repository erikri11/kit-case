import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { OrdersGrid } from '@features/orders/components/OrdersGrid/OrdersGrid';
import { useOrders } from '@features/orders/hooks/useOrders';

export function OrdersPage() {
  const { t } = useTranslation("orders");
  const { orders } = useOrders();

  return (
    <>
      <PageTitle 
        title={t("orders:pageTitle.title")} 
        subtitle={t("orders:pageTitle.subtitle")} 
      />

      <OrdersGrid 
        orders={orders}
      />
  </>
  );
}

export default OrdersPage;
