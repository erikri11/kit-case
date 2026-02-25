import { useContext } from 'react';
import { UserRightsContext } from './userRightsContext';

export function useUserRights() {
  const ctx = useContext(UserRightsContext);
  if (!ctx) {
    throw new Error('useUserRights must be used within UserRightsProvider');
  }
  return ctx;
}
