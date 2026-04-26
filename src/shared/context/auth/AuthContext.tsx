import { createContext } from "react";

export interface AuthUser {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
