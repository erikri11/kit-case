import type { MenuItem } from '../../shared/types/menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupsIcon from '@mui/icons-material/Groups';

export const menuItems: MenuItem[] = [
  { textKey: 'menu.dashboard', url: '/dashboard', icon: <DashboardIcon /> },
  { textKey: 'menu.orders', url: '/admin/orders', icon: <StoreIcon /> },
  { textKey: 'menu.products', url: '/admin/products', icon: <InventoryIcon /> },
  { textKey: 'menu.customers', url: '/admin/customers', icon: <GroupsIcon />,
    items: [
      { textKey: 'menu.customers.list', url: '/admin/customers/list' },
      { textKey: 'menu.customers.create', url: '/admin/customers/create' },
      { textKey: 'menu.customers.details', url: '/admin/customers/details/1' },
    ]
  },
];