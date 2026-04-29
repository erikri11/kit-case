import { Box, Drawer} from '@mui/material';
import { DRAWER_WIDTH } from '../shared/models/constants/drawerWidth.constants';
import type { MenuItem } from '@shared/models/model/menu.model';
import { PersistentDrawerContent } from './PersistentDrawerContent';

export interface PersistentDrawerProps {
  mobileOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

export function PersistentDrawer({
  mobileOpen, 
  onClose, 
  menuItems
}: PersistentDrawerProps) {

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
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box"
          }
        }}
      >
        <PersistentDrawerContent 
          menuItems={menuItems} 
        />
      </Drawer>

      {/* Permanent drawer on desktop */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box"
          }
        }}
      >
        <PersistentDrawerContent 
          menuItems={menuItems} 
        />
      </Drawer>
    </Box>
  );
}

export default PersistentDrawer;
