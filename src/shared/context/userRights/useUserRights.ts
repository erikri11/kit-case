import { useContext } from 'react';
import { UserRightsContext } from './UserRightsContext';

export function useUserRights() {
  const context = useContext(UserRightsContext);
  if (!context) {
    throw new Error('useUserRights must be used within UserRightsProvider');
  }
  return context;
}
