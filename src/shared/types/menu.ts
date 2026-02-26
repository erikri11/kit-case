import type { ReactNode } from "react";
import type { RoleEnum } from "./roleEnum";

export interface MenuItem {
  textKey: string;
  url: string;
  icon?: ReactNode;
  items?: MenuItem[];
  requiredRole?: RoleEnum;
}
