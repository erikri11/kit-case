import { useTranslation } from "react-i18next";
import type { Task } from "@features/tasks/models/task.model";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import { createTaskGridColumns } from "./createTaskGridColumns";
import { useState } from "react";
import { TaskUpsertDialog } from "../TaskUpsertDialog/TaskUpsertDialog";
import TaskDeleteDialog from "../TaskDeleteDialog/TaskDeleteDialog";

interface TasksGridProps {
  tasks: Task[];
}

export function TasksGrid({ 
  tasks
}: TasksGridProps) {
  const { t } = useTranslation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [updateTask, setUpdateTask] = useState<Task | undefined>();
  const [deleteTask, setDeleteTask] = useState<Task | undefined>();

  const headers = createTaskGridColumns({ 
    t,
    onEdit: setUpdateTask,
    onDelete: setDeleteTask
    });

  return (
    <>
      <DataGridTable 
        data={tasks} 
        headers={headers}
        isAddButtonVisible
        addButtonLabel={t("tasks:action.add")}
        onAddButtonClick={() => setIsAddOpen(true)}
      />

      {isAddOpen && (
        <TaskUpsertDialog
          open
          mode="add"
          onClose={() => setIsAddOpen(false)}
        />
      )}

      {updateTask && (
        <TaskUpsertDialog
          open
          mode="edit"
          initialTask={updateTask}
          taskId={updateTask.id}
          onClose={() => setUpdateTask(undefined)}
        />
      )}

      {deleteTask && (
        <TaskDeleteDialog
          open
          task={deleteTask}
          onClose={() => setDeleteTask(undefined)}
        />
      )}

    </>
  );
}
