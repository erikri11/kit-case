import { useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, type AuthUser } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "authUser";

function getStoredUser(): AuthUser | null {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? (JSON.parse(storedUser) as AuthUser) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const value = useMemo(() => {
    const login = (authUser: AuthUser) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      setUser(authUser);
      navigate("/overview");
    };

    const logout = () => {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
      navigate("/signup");
    };

    return {
      user,
      login,
      logout,
      isAuthenticated: Boolean(user)
    };
  }, [navigate, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
