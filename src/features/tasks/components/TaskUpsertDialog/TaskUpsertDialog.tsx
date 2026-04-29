import { Button, Dialog, DialogActions, DialogContent, DialogTitle,FormControl,Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import type { Task } from "@features/tasks/models/task.model";
import type { Mode } from "@shared/types/mode";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTaskUpsertDialog } from "./useTaskUpsertDialog";

export interface TaskUpsertDialogProps {
  open: boolean;
  mode: Mode;
  initialTask?: Task;
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

  const {
    t,
    title,
    description,
    priority,
    status,
    dueDate,
    showTitleError,
    canSubmit,
    titleError,
    setTitle,
    setDescription,
    setPriority,
    setStatus,
    setDueDate,
    setTouched,
    handleUpsertTask
  } = useTaskUpsertDialog({
    mode,
    initialTask,
    taskId,
    onClose
  });

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
              helperText={showTitleError && titleError ? t(titleError) : ""}
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
                  disablePast
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

export default TaskUpsertDialog;
