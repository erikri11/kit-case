import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import { Button, Divider, Stack, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';

export interface BaseToolbarProps {
  quickFilter: string;
  isAddButtonVisible?: boolean;
  addButtonLabel?: string;
  disableSearch?: boolean;
  setQuickFilter: (value: string) => void;
  onAddButtonClick?: () => void;
}

export function BaseToolbar({ 
  quickFilter, 
  isAddButtonVisible, 
  addButtonLabel,
  disableSearch,
  setQuickFilter, 
  onAddButtonClick 
}: BaseToolbarProps) {
  
  const { t } = useTranslation("common");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuickFilter(e.target.value)
  };

  return (
    <Stack 
      direction={{ xs: "column", md: "row" }} 
      spacing={{ xs: 1, md: 2 }} 
      sx={{ mb: 3 }}
    >
      {!disableSearch && (
        <TextField
          label={t("common:labels.search")}
          type="search"
          name="quickFilter"
          variant="filled"
          size="small"
          onChange={handleSearchChange}
          value={quickFilter}
          sx={{ minWidth: 300 }}
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
            {addButtonLabel}
          </Button>
        </>
      }
    </Stack>
  );
}

export default BaseToolbar;
