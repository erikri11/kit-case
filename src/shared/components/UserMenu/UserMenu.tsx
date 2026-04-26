import { Logout } from "@mui/icons-material";
import { Avatar, Box, MenuItem, ListItemIcon, Menu, Tooltip, IconButton } from "@mui/material";
import { useAuth } from "@shared/context/auth/useAuth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export function UserMenu() {
  const { t } = useTranslation("common");
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  if (!user) return null;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title={t("common:labels.accountSettings")}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 32, height: 32 }}
            >
              {user.name.charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("common:labels.logout")}
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
