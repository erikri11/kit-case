import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { theme } from '@shared/theme/mui/theme';
import type { Task } from '@features/tasks/models/task.model';
import { useTaskDeleteDialog } from './useTaskDeleteDialog';

export interface TaskDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  task?: Task;
}

export function TaskDeleteDialog({
  open,
  onClose,
  task
}: TaskDeleteDialogProps) {
  
  const { t, handleDeleteTask } = useTaskDeleteDialog(onClose, task);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
    >
      <DialogTitle>{t("common:confirmDelete")}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 1 }}>
          {t("common:confirmDeleteMessage")}
          </Typography>
        <Typography sx={{ mt: 1 }} color={theme.typography.subtitle2.color}>
          {task?.title}
          </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t("common:cancel")}
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDeleteTask}
        >
          {t("common:delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDeleteDialog;
