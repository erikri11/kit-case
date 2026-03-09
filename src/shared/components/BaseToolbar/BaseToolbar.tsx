import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import { Button, Divider, Stack, TextField } from '@mui/material';

export interface BaseToolbarProps {
  quickFilter: string;
  isAddButtonVisible?: boolean;
  disableSearch?: boolean;
  setQuickFilter: (value: string) => void;
  onAddButtonClick?: () => void;
}

export function BaseToolbar({ 
  quickFilter, 
  isAddButtonVisible, 
  disableSearch,
  setQuickFilter, 
  onAddButtonClick 
}: BaseToolbarProps) {
  
  const { t } = useTranslation(['common', 'customers']);
  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuickFilter(e.target.value)
  };

  return (
    <Stack 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={{ xs: 1, md: 2 }} 
      sx={{ mb: 3 }}
    >
      {!disableSearch && (
        <TextField
          label={t('common:search')}
          type="search"
          name='quickFilter'
          variant='filled'
          size="small"
          onChange={search}
          value={quickFilter}
        />
      )}
      {isAddButtonVisible && 
        <>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={onAddButtonClick}
          >
            {t('customers:actions.add')}
          </Button>
        </>
      }
    </Stack>
  );
}

export default BaseToolbar;
