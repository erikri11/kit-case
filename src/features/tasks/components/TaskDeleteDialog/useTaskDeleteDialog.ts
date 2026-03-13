import { taskApi } from "@features/tasks/api/taskApi";
import type { Task } from "@features/tasks/models/task.model";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useTranslation } from "react-i18next";

export function useTaskDeleteDialog(
  onClose: () => void, 
  task?: Task
) {
  const { t } = useTranslation(["common", "tasks"]);
  const { setSnackbarMessage } = useSnackbar();

  const handleDeleteTask = async () => { 
    try {
      if (task?.id) {
        await taskApi.delete(task.id);
        setSnackbarMessage({ 
          content: t("tasks:snackbar.deleteSuccess"), 
          type: "success" 
        });
      }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to delete task:", errorMessage);

      setSnackbarMessage({ 
        content: t("tasks:snackbar.deleteError"), 
        type: "error" 
      });
    }
  };

  return {
    t,
    task,
    handleDeleteTask
  }
}