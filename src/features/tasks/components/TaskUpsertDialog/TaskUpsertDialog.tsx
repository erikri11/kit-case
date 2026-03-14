import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,FormControl,Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import type { TaskCreate, TaskFieldName, TaskPriority, TaskStatus, TaskUpdate } from "@features/tasks/models/task.model";
import { validateTitle } from "@features/tasks/validation/validateTask";
import type { Mode } from "@shared/types/mode";
import { taskApi } from "@features/tasks/api/taskApi";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export interface TaskUpsertDialogProps {
  open: boolean;
  mode: Mode;
  initialTask?: TaskUpdate;
  taskId?: string;
  onClose: () => void;
}

export function TaskUpsertDialog({ 
  open, 
  mode,
  initialTask,
  taskId,
  onClose
}: TaskUpsertDialogProps) {

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
            priority: priority,
            status: status,
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

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
    >
      <DialogTitle>
        {mode === "add" ? t("tasks:actions.add") : t("tasks:actions.edit")}
      </DialogTitle>
      <DialogContent className="pt-3">
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label={t("common:labels.title")}
              variant="filled" 
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((prev) => ({ 
                ...prev, 
                title: true 
              }))}
              error={showTitleError}
              helperText={showTitleError ? titleError : ""}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label={t("common:labels.description")}
              variant="filled" 
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                const lines = value.split("\n");
                if (lines.length <= 3) {
                  setDescription(value);
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl 
              variant="filled" 
              fullWidth
            >
              <InputLabel>{t("common:labels.priority")}</InputLabel>
              <Select
                value={priority}
                label={t("common:labels.priority")}
                onChange={(e) => setPriority(e.target.value)}
                renderValue={(value) => t(`tasks:priority.${value}`)}
              >
                <MenuItem value={"Low"}>{t("tasks:priority.Low")}</MenuItem>
                <MenuItem value={"Medium"}>{t("tasks:priority.Medium")}</MenuItem>
                <MenuItem value={"High"}>{t("tasks:priority.High")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {mode === 'edit' && (
            <>
              <Grid size={6}>
                <FormControl 
                  variant="filled" 
                  fullWidth
                >
                  <InputLabel>{t("common:labels.status")}</InputLabel>
                  <Select
                    value={status}
                    label={t("common:labels.status")}
                    onChange={(e) => setStatus(e.target.value)}
                    renderValue={(value) => t(`tasks:status.${value}`)}
                  >
                    <MenuItem value={"Todo"}>{t("tasks:status.Todo")}</MenuItem>
                    <MenuItem value={"InProgress"}>{t("tasks:status.InProgress")}</MenuItem>
                    <MenuItem value={"Done"}>{t("tasks:status.Done")}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <DatePicker
                  format="dd.MM.yyyy"
                  label={t('common:labels.dueDate')}
                  value={dueDate}
                  onChange={(newDateValue: Date | null) => {
                    setDueDate(newDateValue ?? new Date());
                  }}
                  slotProps={{
                    textField: {
                      variant: "filled"
                    }
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="outlined" 
          onClick={onClose}
        >
          {t("common:actions.cancel")}
        </Button>
        <Button 
          variant="contained" 
          onClick={handleUpsertTask} 
          disabled={!canSubmit}
        >
          {mode === "add" ? t("common:actions.add") : t("common:actions.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
