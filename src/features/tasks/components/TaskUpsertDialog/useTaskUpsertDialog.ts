import { taskApi } from "@features/tasks/api/taskApi";
import type { Task, TaskCreate, TaskFieldName, TaskPriority, TaskStatus, TaskUpdate } from "@features/tasks/models/task.model";
import { validateTitle } from "@features/tasks/validation/validateTask";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import type { Mode } from "@shared/models/types/mode.type";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface UseTaskUpsertDialogProps {
  mode: Mode;
  initialTask?: Task;
  taskId?: string;
  onClose: () => void;
}

export function useTaskUpsertDialog({ 
  mode, 
  initialTask, 
  taskId, 
  onClose 
}: UseTaskUpsertDialogProps) {
  
  const { t } = useTranslation(["tasks", "common"]);
  const { setSnackbarMessage } = useSnackbar();

  const [title, setTitle] = useState<string>(initialTask?.title ?? "");
  const [description, setDescription] = useState<string>(initialTask?.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? "Low");
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? "Todo");
  const [dueDate, setDueDate] = useState<Date>(initialTask?.dueDate ? new Date(initialTask.dueDate) : new Date());
  const [touched, setTouched] = useState<Record<TaskFieldName, boolean>>({ title: false });
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const titleError = validateTitle(title);
  const canSubmit = !titleError;
  
  const showTitleError = !!titleError && (touched.title || submitted);

  const handleUpsertTask = async () => { 
    setSubmitted(true);
    if (!canSubmit) return;
  
    try {
      if (mode === "add") {
        const payload: TaskCreate = { 
        title: title.trim(),
        description: description.trim(),
        priority: "Low",
        status: "Todo",
        dueDate: dueDate
      };

      await taskApi.post(payload);

      setSnackbarMessage({ 
        content: t("tasks:snackbar.addSuccess"), 
        type: "success" 
      });
    } else if (mode === "edit") {
      if (!taskId) return;

      const payload: TaskUpdate = {
        title: title.trim(),
        description: description.trim(),
        priority: priority,
        status: status,
        dueDate: dueDate
      };

      await taskApi.put(taskId, payload);
      
      setSnackbarMessage({ 
        content: t("tasks:snackbar.updateSuccess"), 
        type: "success" 
      });
    }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error updating task:", errorMessage);

      setSnackbarMessage({
        content:
          mode === "add"
            ? t("tasks:snackbar.addError")
            : t("tasks:snackbar.updateError"),
        type: "error"
      });
    }
  };

  return {
    t,
    title,
    description,
    priority,
    status,
    dueDate,
    touched,
    submitted,
    showTitleError,
    canSubmit,
    titleError,
    setTitle,
    setDescription,
    setPriority,
    setStatus,
    setDueDate,
    setTouched,
    setSubmitted,
    handleUpsertTask
  };
}

export default useTaskUpsertDialog;