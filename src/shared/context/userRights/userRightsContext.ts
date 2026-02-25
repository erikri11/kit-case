import type { RoleEnum } from "@shared/types/roleEnum";
import { createContext } from "react";

export interface UserRightsContextProps {
  role: RoleEnum;
  setRole: (role: RoleEnum) => void;
}

export const UserRightsContext = createContext<UserRightsContextProps | null>(null);
