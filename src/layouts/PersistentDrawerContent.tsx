import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import type { PersistentDrawerProps } from "./PersistentDrawer";
import { useTranslation } from "react-i18next";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar } from "@mui/material";
import { checkMenuAccess } from "@app/routes/access";
import { useUserRights } from "@shared/context/userRights/useUserRights";
import { MenuGroupItem } from "./MenuGroupItem";

export function PersistentDrawerContent(props: PersistentDrawerProps) {
  const { role } = useUserRights();
  const location = useLocation();
  const { t } = useTranslation(["menu", "overview"]);

   if (!role) return null;
   const pathname = location.pathname;

  return (
    <Box sx={{ 
      height: "100%", 
      display: "flex", 
      flexDirection: "column" 
      }}
    >
      <Toolbar />
      
      <List
        subheader={
          <ListSubheader 
            component="div" 
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            {t("common:navigation")}
          </ListSubheader>
        }
      >
        {props.menuItems.map((item) => {
          const key = item.url ?? item.textKey;
          const hasChildren = Boolean(item.items?.length);

          // 1) Parent with children => collapsible group
          if (hasChildren) {
            return (
              <Fragment key={key}>
                {checkMenuAccess(
                  <MenuGroupItem item={item} role={role} />,
                  [role],
                  item.requiredRole
                )}
              </Fragment>
            );
          }

          // 2) Normal single link item
          const isActive =
            item.url &&
            (pathname === item.url || pathname.startsWith(`${item.url}/`));

          return (
            <Fragment key={key}>
              {checkMenuAccess(
                <ListItemButton
                  component={item.url ? Link : "button"}
                  to={item.url ?? undefined}
                  selected={Boolean(isActive)}
                >
                  {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
                  <ListItemText 
                    primary={t(item.textKey)} 
                    slotProps={{
                        primary: { variant: "menu" }
                    }}
                  />
                </ListItemButton>,
                [role],
                item.requiredRole
              )}
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
}
