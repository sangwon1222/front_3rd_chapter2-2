import { useContext } from 'react';
import { AdminContext } from './Context';

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within a AdminProvider');
  return context;
};
