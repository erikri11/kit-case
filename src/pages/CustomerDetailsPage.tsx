import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { PageTitle } from '../widgets/PageTitle/PageTitle';

export function CustomerDetailsPage() {
  const { t } = useTranslation('customers');

  return (
   <Box>
      <PageTitle title={t('customers:pageTitle.title')} subtitle={t('customers:pageTitle.subtitle')} />
    </Box>
  );
}

export default CustomerDetailsPage;
