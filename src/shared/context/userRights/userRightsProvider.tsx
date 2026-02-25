import { useMemo, useState, useCallback, type ReactNode } from 'react';
import { UserRightsContext } from './userRightsContext';
import { RoleEnum } from '@shared/types/roleEnum';

const STORAGE_KEY = 'demo.role';
const initialRole = RoleEnum.USER;

export interface UserRightsProviderProps {
  children: ReactNode;
}

export function UserRightsProvider({ children }: UserRightsProviderProps) {
  const [role, setRoleState] = useState<RoleEnum>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && Object.values(RoleEnum).includes(stored as RoleEnum)) {
      return stored as RoleEnum;
    }
    return initialRole;
  });

  const setRole = useCallback((newRole: RoleEnum) => {
    setRoleState(newRole);
    localStorage.setItem(STORAGE_KEY, newRole);
  }, []);

  const value = useMemo(
    () => ({ role, setRole }), 
    [role, setRole]
  );

  return (
    <UserRightsContext.Provider value={value}>
      {children}
    </UserRightsContext.Provider>
  );
}
