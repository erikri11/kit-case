import { useState } from 'react';
import { Box, Container, Toolbar } from "@mui/material";
import { menuItems } from './app/config/menuConfig';
import { DRAWER_WIDTH } from './shared/types/drawerWidth';
import AppHeader from '@widgets/AppHeader/AppHeader';
import AppFooter from '@widgets/AppFooter';
import { PersistentDrawer } from './layout/PersistentDrawer';
import { AppRoutes } from './app/routes/router';

export function App() {
 const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(open => !open);
  };

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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
        }}
      >
        {/* Push content below AppBar */}
        <Toolbar />

        <Container maxWidth={false} disableGutters sx={{ flex: 1 }}>
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <AppRoutes />
          </Container>
        </Container>

        <AppFooter />
      </Box>
    </Box>
  );
}

export default App;
