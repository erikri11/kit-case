import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { CustomersGrid } from '@features/customers/components/CustomerGrid/CustomerGrid';

export function CustomersPage() {
  const { t } = useTranslation('customers');

  return (
   <>
      <PageTitle 
        title={t('customers:pageTitle.title')} 
        subtitle={t('customers:pageTitle.subtitle')} 
      />
      <CustomersGrid />
   </>
  );
}

export default CustomersPage;
