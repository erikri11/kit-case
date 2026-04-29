import type { ReactNode } from "react";
import type { Role } from "../constants/role.constants";

export interface MenuItem {
  textKey: string;
  url: string;
  icon?: ReactNode;
  items?: MenuItem[];
  requiredRole?: Role;
}
