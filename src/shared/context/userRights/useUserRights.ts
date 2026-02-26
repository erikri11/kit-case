import { useContext } from 'react';
import { UserRightsContext } from './UserRightsContext';

export function useUserRights() {
  const ctx = useContext(UserRightsContext);
  if (!ctx) {
    throw new Error('useUserRights must be used within UserRightsProvider');
  }
  return ctx;
}
