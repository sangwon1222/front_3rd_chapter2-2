import { AdminContext } from '@provider/Context';
import { useContext } from 'react';

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within a AdminProvider');
  return context;
};
