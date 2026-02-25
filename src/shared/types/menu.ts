import type { ReactNode } from "react";

export interface MenuItem {
  textKey: string;
  url: string;
  icon?: ReactNode;
  items?: MenuItem[];
}
