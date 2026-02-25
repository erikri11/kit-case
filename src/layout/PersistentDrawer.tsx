import {Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { DRAWER_WIDTH } from "../shared/types/drawerWidth";
import { checkMenuAccess } from "../app/routes/access";
import { useUserRights } from "../shared/context/userRights/userRights";
import { useTranslation } from "react-i18next";
import type { MenuItem } from "@shared/types/menu";

interface PersistentDrawerProps {
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
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box"
          }
        }}
      >
        <PersistentDrawerContent
          menuItems={props.menuItems}
          mobileOpen={props.mobileOpen}
          onClose={props.onClose}
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
          menuItems={props.menuItems}
          mobileOpen={props.mobileOpen}
          onClose={props.onClose}
        />
      </Drawer>
    </Box>
  );
}

function PersistentDrawerContent(props: PersistentDrawerProps) {
  const { role } = useUserRights();
  const location = useLocation();
  const { t } = useTranslation('menu');

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Push content below AppBar */}
      <Toolbar />

      <List
        subheader={
          <ListSubheader
            component='div'
            className='d-sm-none'>
            Navigasjon
          </ListSubheader>
        }
      >
        {props.menuItems.map((i, index) => (
          <React.Fragment key={index}>
            {role && checkMenuAccess(
              <ListItemButton
                component={Link}
                to={i.url}
                selected={location.pathname === i.url || location.pathname.startsWith(i.url + '/')}
                key={i.textKey}>
                <ListItemIcon>
                  {i.icon}
                </ListItemIcon>
                <ListItemText primary={t(i.textKey)} />
              </ListItemButton>,
              [role]
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
