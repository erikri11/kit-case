import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { TasksGrid } from '@features/tasks/components/TasksGrid/TasksGrid';
import { useTasks } from '@features/tasks/hooks/useTasks';

export function TasksPage() {
  const { t } = useTranslation("tasks");
  const { tasks } = useTasks();

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
