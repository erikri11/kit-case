import type { ICellRendererParams } from 'ag-grid-enterprise';
import { Box, IconButton, Tooltip, type IconButtonProps } from '@mui/material';
import type { Customer } from '@features/customers/models/customer';
import type { SvgIconComponent } from '@mui/icons-material';

interface ActionButtonRendererProps {
  icon: SvgIconComponent; 
  iconButtonProps?: Omit<IconButtonProps, 'onClick' | 'children'>;
  title: string;
  onAction: (customer: Customer) => void;
}

export function createActionButtonRenderer({ 
  icon: Icon,
  iconButtonProps,
  title,
  onAction
}: ActionButtonRendererProps) {

  return (params: ICellRendererParams<Customer>) => {
    const customer = params.data;
    if (!customer) return null;

    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Tooltip title={title}>
          <IconButton 
            size='small'
            onClick={() => onAction(customer)}
            {...iconButtonProps}
          >
          <Icon />
          </IconButton>
        </Tooltip>
       
      </Box>
    );
  };
}
