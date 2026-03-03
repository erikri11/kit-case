import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import type { Customer } from '@features/customers/models/customer';
import { avatarRenderer } from '../renderers/avatarRenderer';
import { dateRenderer } from '../renderers/dateRenderer';
import { chipRenderer } from '../renderers/chipRenderer';
import { statusRankCompare } from '@features/customers/components/comparators/statusRankCompare';
import { linearProgressRenderer } from '../renderers/linearProgressRenderer';
import { createActionButtonRenderer } from '../renderers/createActionButtonRenderer';

interface ColumnArgsProps {
  t: TFunction;
  onAction: (customer: Customer) => void;
}

export function createCustomerGridColumns({ 
  t, 
  onAction: onEdit
}: ColumnArgsProps): ColDef<Customer>[] {

  const editRenderer = createActionButtonRenderer({
    t: t,
    label: 'common:edit',
    onAction: onEdit
  });

  return [
    {
      field: 'name',
      headerName: t('common:name'),
      minWidth: 180,
      flex: 1
    },
    {
      field: 'avatar',
      headerName: t('common:avatar'),
      minWidth: 100,
      cellRenderer: avatarRenderer
    },
    {
      field: 'email',
      headerName: t('common:email'),
      minWidth: 180,
      flex: 1
    },
    {
      field: 'phone',
      headerName: t('common:phone'),
      minWidth: 140,
      type: 'rightAligned'
    },
    {
      field: 'quota',
      headerName: t('common:quota'),
      minWidth: 140,
      cellRenderer: linearProgressRenderer
    },
    {
      field: 'status',
      headerName: t('common:status'),
      minWidth: 160,
      cellRenderer: chipRenderer,
      comparator: statusRankCompare
    },
    {
      field: 'createdAt',
      headerName: t('common:createdAt'),
      minWidth: 160,
      type: 'rightAligned',
      cellRenderer: dateRenderer
    },
    {
      headerName: '',
      minWidth: 160,
      type: 'rightAligned',
      cellRenderer: editRenderer
    },
    // {
    //   headerName: '',
    //   minWidth: 160,
    //   type: 'rightAligned',
    //   cellRenderer: deleteRenderer
    // },
  ];
}
