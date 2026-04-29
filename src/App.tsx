import { useState } from 'react';
import { Box, Container, Toolbar } from "@mui/material";

import { DRAWER_WIDTH } from '@shared/models/constants/drawerWidth.constants';
import AppHeader from '@widgets/AppHeader/AppHeader';
import AppFooter from '@widgets/AppFooter';
import { PersistentDrawer } from '@layouts/PersistentDrawer';
import { AppRoutes } from './app/routes/router';
import { useLocation } from 'react-router-dom';
import { menuItems } from '@app/config/menuConfig';

export function App() {
 const [mobileOpen, setMobileOpen] = useState(false);
 const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(open => !open);
  };

  const pageMaxWidth =
    pathname.startsWith("/admin/customers/details")
      ? "xl"
      : pathname.startsWith("/admin/customers")
      ? false
      : "xl";

  return (
    <Box sx={{ display: "flex" }}>
      <AppHeader onMenuClick={handleDrawerToggle} />

      <PersistentDrawer
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        menuItems={menuItems}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
        }}
      >
        {/* Push content below AppBar */}
        <Toolbar />

        <Container maxWidth={false} disableGutters sx={{ flex: 1 }}>
          <Container maxWidth={pageMaxWidth} sx={{ py: 4 }}>
            <AppRoutes />
          </Container>
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
}

export default App;
