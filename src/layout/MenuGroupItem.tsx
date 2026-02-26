import { checkMenuAccess } from "@app/routes/access";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { MenuItem } from "@shared/types/menu";
import type { RoleEnum } from "@shared/types/roleEnum";
import { isExactPath } from "@shared/utils/isExactPath";
import { isSelectedPath } from "@shared/utils/isSelectedPath";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export function MenuGroupItem({ item, role }: { item: MenuItem; role: RoleEnum }) {
  const [userOpen, setUserOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation('menu');

  const hasActiveChild = item.items?.some((child) => isSelectedPath(location.pathname, child.url) ?? false);
  const open = hasActiveChild || userOpen;
  
  return (
    <>
      <ListItemButton 
        onClick={() => setUserOpen((prev) => !prev)} 
        selected={isExactPath(location.pathname, item.url)}
      >
        {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
        <ListItemText primary={t(item.textKey)} />
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
                    component={child.url ? Link : 'button'}
                    to={child.url ?? undefined}
                    sx={{ pl: 6 }}
                    selected={isSelectedPath(location.pathname, child.url)}
                  >
                    {child.icon ? <ListItemIcon>{child.icon}</ListItemIcon> : null}
                    <ListItemText primary={t(child.textKey)} />
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
