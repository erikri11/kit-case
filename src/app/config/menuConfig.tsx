import type { MenuItem } from '../../shared/types/menu';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

export const menuItems: MenuItem[] = [
  { textKey: 'menu.dashboard', url: '/dashboard', icon: <DashboardOutlinedIcon /> },
  { textKey: 'menu.orders', url: '/admin/orders', icon: <StoreOutlinedIcon /> },
  { textKey: 'menu.products', url: '/admin/products', icon: <WarehouseOutlinedIcon /> },
  { textKey: 'menu.customers', url: '/admin/customers', icon: <PeopleOutlinedIcon />,
    items: [
      { textKey: 'menu.customers.list', url: '/admin/customers/list' },
      { textKey: 'menu.customers.details', url: '/admin/customers/details' },
    ]
  },
];
