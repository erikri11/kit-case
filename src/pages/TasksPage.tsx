import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { TasksGrid } from '@features/tasks/components/TasksGrid/TasksGrid';

export function TasksPage() {
  const { t } = useTranslation('tasks');

  return (
    <>
      <PageTitle 
        title={t('tasks:pageTitle.title')} 
        subtitle={t('tasks:pageTitle.subtitle')} 
      />
      <TasksGrid />
  </>
  );
}

export default TasksPage;
