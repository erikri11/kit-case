import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import { Button, Divider, Stack, TextField } from '@mui/material';

export interface BaseToolbarProps {
  quickFilter: string;
  setQuickFilter: (value: string) => void;
  isAddTaskButtonVisible?: boolean;
  onAddTaskClick?: () => void;
}

export function BaseToolbar(props: BaseToolbarProps) {
  const { t } = useTranslation(['common', 'tasks']);
  const search = (e: React.ChangeEvent<HTMLInputElement>) => props.setQuickFilter(e.target.value);

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 2 }} className='mb-3'>
      <TextField
        label={t('common:search')}
        type="search"
        name='quickFilter'
        variant='filled'
        size='small'
        onChange={search}
        value={props.quickFilter}
      />

      {props.isAddTaskButtonVisible && <>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={props.onAddTaskClick}
        >
          {t('tasks:actions.add')}
        </Button>
      </>}
    </Stack>
  );
}

export default BaseToolbar;
