import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from '@features/tasks/models/task.model';
import { createActionButtonRenderer } from '@shared/renderers/createActionButtonRenderer';
import { dateRenderer } from '@shared/renderers/dateRenderer';
import { TaskStatusChipRenderer } from '../renderers/TaskStatusChipRenderer';
import { PriorityChipRenderer } from '../renderers/PriorityChipRenderer';
import { priorityRankCompare } from '../comparators/priorityRankCompare';
import { taskStatusRankCompare } from '../comparators/taskStatusRankCompare';

interface ColumnArgsProps {
  t: TFunction;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function createTaskGridColumns({ 
  t, 
  onEdit,
  onDelete
}: ColumnArgsProps): ColDef<Task>[] {

  const editRenderer = createActionButtonRenderer<Task>({
    icon: EditIcon,
    iconButtonProps: { color: 'default' },
    title: t("common:actions.edit"),
    onAction: onEdit
  });

  const deleteRenderer = createActionButtonRenderer<Task>({
    icon: DeleteIcon,
    iconButtonProps: { color: 'error' },
    title: t("common:actions.delete"),
    onAction: onDelete
  });

  return [
    {
      field: "title",
      headerName: t("common:labels.title"),
      minWidth: 180,
      flex: 2
    },
    {
      field: "description",
      headerName: t("common:labels.description"),
      minWidth: 200,
      flex: 2
    },
    {
      field: "priority",
      headerName: t("common:labels.priority"),
      minWidth: 160,
      flex: 1,
      cellRenderer: PriorityChipRenderer,
      comparator: priorityRankCompare
    },
    {
      field: "status",
      headerName: t("common:labels.status"),
      minWidth: 160,
      flex: 1,
      cellRenderer: TaskStatusChipRenderer,
      comparator: taskStatusRankCompare
      
    },
    {
      field: "createdAt",
      headerName: t("common:labels.createdAt"),
      minWidth: 160,
      flex: 1,
      type: "rightAligned",
      cellRenderer: dateRenderer
    },
    {
      field: "dueDate",
      headerName: t("common:labels.dueDate"),
      minWidth: 160,
      flex: 1,
      type: "rightAligned",
      cellRenderer: dateRenderer
    },
    {
      headerName: '',
      minWidth: 100,
      flex: 1,
      type: "rightAligned",
      filter: false,
      cellRenderer: editRenderer
    },
    {
      headerName: '',
      minWidth: 100,
      flex: 1,
      type: "rightAligned",
      filter: false,
      cellRenderer: deleteRenderer
    }
  ];
}
