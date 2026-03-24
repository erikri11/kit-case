import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
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
  
  const { 
    t, 
    handleDeleteTask 
  } = useTaskDeleteDialog(
    onClose, 
    task
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
    >
      <DialogTitle>{t("common:labels.confirmDelete")}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 1 }}>
          {t("common:labels.confirmDeleteMessage")}
        </Typography>
        <Typography sx={{ mt: 1, color: 'customTextGrey.main' }} variant="subtitle2">
          {task?.title}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t("common:actions.cancel")}
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDeleteTask}
        >
          {t("common:actions.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDeleteDialog;
