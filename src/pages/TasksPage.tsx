import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { TasksGrid } from '@features/tasks/components/TasksGrid/TasksGrid';
import { useTask } from '@features/tasks/hooks/useTask';

export function TasksPage() {
  const { t } = useTranslation("tasks");
  const tasks = useTask();

  return (
    <>
      <PageTitle 
        title={t("tasks:pageTitle.title")} 
        subtitle={t("tasks:pageTitle.subtitle")} 
      />
      <TasksGrid 
        tasks={tasks} 
      />
  </>
  );
}

export default TasksPage;
