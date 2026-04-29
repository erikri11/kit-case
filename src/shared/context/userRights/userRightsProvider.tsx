import { useMemo, useState, useCallback, type ReactNode } from 'react';
import { UserRightsContext } from './UserRightsContext';
import { ROLES, type Role } from '@shared/models/constants/role.constants';

const STORAGE_KEY = "app.role";
const initialRole: Role = ROLES.USER;

export interface UserRightsProviderProps {
  children: ReactNode;
}

export function UserRightsProvider({ 
  children 
}: UserRightsProviderProps) {
  
  const [role, setRoleState] = useState<Role>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored && Object.values(ROLES).includes(stored as Role)) {
      return stored as Role;
    }
    
    return initialRole;
  });

  const setRole = useCallback((newRole: Role) => {
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

export default UserRightsProvider;
