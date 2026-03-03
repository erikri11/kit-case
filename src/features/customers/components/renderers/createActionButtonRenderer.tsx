import type { ICellRendererParams } from 'ag-grid-enterprise';
import { Button, type ButtonProps } from '@mui/material';
import { type TFunction } from 'i18next';
import type { Customer } from '@features/customers/models/customer';

interface ActionButtonRendererProps {
  t: TFunction;
  label: string;
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
  onAction: (customer: Customer) => void;
}

export function createActionButtonRenderer({ 
  t, 
  label,
  buttonProps,
  onAction
}: ActionButtonRendererProps) {

  return (params: ICellRendererParams<Customer>) => {
    const customer = params.data;
    if (!customer) return null;

    return (
      <Button
        size="small"
        variant="contained"
        onClick={() => onAction(customer)}
        {...buttonProps}
      >
        {t(label)}
      </Button>
    );
  };
}
