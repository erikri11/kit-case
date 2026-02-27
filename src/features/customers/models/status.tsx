import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export const STATUS_ORDER = ['Active', 'Pending', 'Blocked'] as const;
export type Status = (typeof STATUS_ORDER)[number];

export const STATUS_ICON = {
  Active: <CheckCircleIcon />,
  Pending: <HourglassEmptyIcon />,
  Blocked: <BlockIcon />
} as const;
