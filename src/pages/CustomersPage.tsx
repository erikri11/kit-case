import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { CustomersGrid } from '@features/customers/components/CustomerGrid/CustomerGrid';

export function CustomersPage() {
  const { t } = useTranslation('customers');

  return (
   <Box>
      <PageTitle title={t('customers:pageTitle.title')} subtitle={t('customers:pageTitle.subtitle')} />
      <CustomersGrid />
    </Box>
  );
}

export default CustomersPage;
