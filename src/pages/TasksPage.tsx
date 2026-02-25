import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { PageTitle } from '../widgets/PageTitle/PageTitle';

export function TasksPage() {
  const { t } = useTranslation('tasks');

  return (
   <Box>
      <PageTitle title={t('tasks:pageTitle.title')} subtitle={t('tasks:pageTitle.subtitle')} />
      
    </Box>
  );
}

export default TasksPage;
