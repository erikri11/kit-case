import { Box, Drawer} from '@mui/material';
import { DRAWER_WIDTH } from '../shared/types/drawerWidth';
import type { MenuItem } from '@shared/types/menu';
import { PersistentDrawerContent } from './PersistentDrawerContent';

export interface PersistentDrawerProps {
  mobileOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

export function PersistentDrawer(props: PersistentDrawerProps) {
  return (
    <Box
      aria-label="sidebar navigation"
      component="nav"
      sx={{
        width: { sm: DRAWER_WIDTH },
        flexShrink: { sm: 0 }
      }}
    >
      {/* Temporary drawer on mobile */}
      <Drawer
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box'
          }
        }}
      >
        <PersistentDrawerContent {...props} />
      </Drawer>

      {/* Permanent drawer on desktop */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box'
          }
        }}
      >
        <PersistentDrawerContent {...props} />
      </Drawer>
    </Box>
  );
}
