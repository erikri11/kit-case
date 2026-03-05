import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import type { Customer } from '@features/customers/models/customer';
import { avatarRenderer } from '../renderers/avatarRenderer';
import { dateRenderer } from '../renderers/dateRenderer';
import { chipRenderer } from '../renderers/chipRenderer';
import { statusRankCompare } from '@features/customers/components/comparators/statusRankCompare';
import { linearProgressRenderer } from '../renderers/linearProgressRenderer';
import { createActionButtonRenderer } from '../renderers/createActionButtonRenderer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { iconRenderer } from '../renderers/iconRenderer';

interface ColumnArgsProps {
  t: TFunction;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onOpenDetails: (customer: Customer) => void;
}

export function createCustomerGridColumns({ 
  t, 
  onEdit,
  onDelete,
  onOpenDetails
}: ColumnArgsProps): ColDef<Customer>[] {

  const editRenderer = createActionButtonRenderer({
    icon: EditIcon,
    iconButtonProps: { color: 'default' },
    title: t('common:edit'),
    onAction: onEdit
  });

  const deleteRenderer = createActionButtonRenderer({
    icon: DeleteIcon,
    iconButtonProps: { color: 'error' },
    title: t('common:delete'),
    onAction: onDelete
  });

  return [
    {
      field: 'name',
      headerName: t('common:name'),
      minWidth: 180,
      flex: 2
    },
    {
      field: 'avatar',
      headerName: t('common:avatar'),
      minWidth: 100,
      flex: 1,
      filter: false,
      cellRenderer: avatarRenderer
    },
    {
      field: 'email',
      headerName: t('common:email'),
      minWidth: 180,
      flex: 2
    },
    {
      field: 'phone',
      headerName: t('common:phone'),
      minWidth: 140,
      flex: 2,
      type: 'rightAligned'
    },
    {
      field: 'quota',
      headerName: t('common:quota'),
      minWidth: 140,
      flex: 2,
      cellRenderer: linearProgressRenderer
    },
    {
      field: 'status',
      headerName: t('common:status'),
      minWidth: 160,
      flex: 1,
      cellRenderer: chipRenderer,
      comparator: statusRankCompare
    },
    {
      field: 'createdAt',
      headerName: t('common:createdAt'),
      minWidth: 160,
      flex: 1,
      type: 'rightAligned',
      cellRenderer: dateRenderer
    },
    {
      headerName: '',
      minWidth: 100,
      flex: 1,
      type: 'rightAligned',
      filter: false,
      cellRenderer: editRenderer
    },
    {
      headerName: '',
      minWidth: 100,
      flex: 1,
      type: 'rightAligned',
      filter: false,
      cellRenderer: deleteRenderer
    },
    {
      headerName: '',
      minWidth: 100,
      flex: 1,
      type: 'rightAligned',
      filter: false,
      cellRenderer: iconRenderer,
      cellRendererParams: {
        onOpenDetails
      } 
    }
  ];
}
