import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { checkMenuAccess } from "@app/routes/access";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { MenuItem } from "@shared/models/model/menu.model";
import { isSelectedPath } from "@shared/utils/isSelectedPath";
import type { Role } from "@shared/models/constants/role.constants";

interface MenuGroupItemProps {
  item: MenuItem;
  role: Role;
}

export function MenuGroupItem({ 
  item, 
  role 
}: MenuGroupItemProps) {
  
  const [userOpen, setUserOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation("menu");

  const pathname = location.pathname;
  const isParentActive = pathname === item.url || pathname.startsWith(`${item.url}/`);

  const hasActiveChild = item.items?.some((child) => isSelectedPath(pathname, child.url) ?? false);
  const open = isParentActive || hasActiveChild || userOpen;
  
  return (
    <>
      <ListItemButton 
        onClick={() => setUserOpen((prev) => !prev)} 
        selected={isParentActive}
      >
        {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
        <ListItemText 
          primary={t(item.textKey)} 
          slotProps={{
            primary: { variant: "menu" }
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse 
        in={open} 
        timeout="auto" 
        unmountOnExit
      >
        <List disablePadding>
          {item.items?.map((child) => {
            const childKey = child.url ?? child.textKey;
            return (
              <Fragment key={childKey}>
                {checkMenuAccess(
                  <ListItemButton
                    component={child.url ? Link : "button"}
                    to={child.url ?? undefined}
                    sx={{ pl: 6 }}
                    selected={isSelectedPath(pathname, child.url)}
                  >
                    {child.icon ? <ListItemIcon>{child.icon}</ListItemIcon> : null}
                    <ListItemText 
                      primary={t(child.textKey)}  
                      slotProps={{
                        primary: { variant: "menu" }
                      }}
                    />
                  </ListItemButton>,
                  [role],
                  child.requiredRole
                )}
              </Fragment>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export default MenuGroupItem;
