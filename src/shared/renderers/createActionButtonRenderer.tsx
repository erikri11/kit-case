import type { ICellRendererParams } from 'ag-grid-enterprise';
import { Box, IconButton, Tooltip, type IconButtonProps } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface ActionButtonRendererProps<T> {
  icon: SvgIconComponent; 
  iconButtonProps?: Omit<IconButtonProps, "onClick" | "children">;
  title: string;
  onAction: (row: T) => void;
  isDisabled?: (params: ICellRendererParams<T>) => boolean;
}

export function createActionButtonRenderer<T>({   
  icon: Icon,
  iconButtonProps,
  title,
  isDisabled,
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
        <Tooltip 
          arrow 
          title={title}  
          disableHoverListener={!title}
        >
          <span>
            <IconButton 
              size="small"
              onClick={() => onAction(row)}
              disabled={isDisabled?.(params)}
              {...iconButtonProps}
            >
            <Icon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    );
  };
}

export default createActionButtonRenderer;
