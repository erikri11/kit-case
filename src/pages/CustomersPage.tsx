import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { CustomersGrid } from '@features/customers/components/CustomerGrid/CustomerGrid';
import { useCustomers } from '@shared/hooks/useCustomers';

export function CustomersPage() {
  const { t } = useTranslation("customers");
  const customers = useCustomers();

  return (
   <>
      <PageTitle 
        title={t("customers:pageTitle.title")} 
        subtitle={t("customers:pageTitle.subtitle")} 
      />
      <CustomersGrid 
        customers={customers}
      />
   </>
  );
}

export default CustomersPage;
