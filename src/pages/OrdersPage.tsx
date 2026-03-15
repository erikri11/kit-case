import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';

export function OrdersPage() {
  const { t } = useTranslation("orders");

  return (
    <>
      <PageTitle 
        title={t("orders:pageTitle.title")} 
        subtitle={t("orders:pageTitle.subtitle")} 
      />
  </>
  );
}

export default OrdersPage;
