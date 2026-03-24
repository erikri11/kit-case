import type { ICellRendererParams } from 'ag-grid-enterprise';
import { Box, IconButton, Tooltip, type IconButtonProps } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface ActionButtonRendererProps<T> {
  icon: SvgIconComponent; 
  iconButtonProps?: Omit<IconButtonProps, "onClick" | "children">;
  title: string;
  onAction: (row: T) => void;
}

export function createActionButtonRenderer<T>({   
  icon: Icon,
  iconButtonProps,
  title,
  onAction
}: ActionButtonRendererProps<T>) {

  return (params: ICellRendererParams<T>) => {
    const row = params.data;
    if (!row) return null;

    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Tooltip title={title}>
          <IconButton 
            size="small"
            onClick={() => onAction(row)}
            {...iconButtonProps}
          >
          <Icon />
          </IconButton>
        </Tooltip>
       
      </Box>
    );
  };
}

export default createActionButtonRenderer;
