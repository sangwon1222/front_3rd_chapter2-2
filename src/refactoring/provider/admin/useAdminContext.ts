import { AdminContext } from '@refactor/provider/admin/context';
import { useContext } from 'react';

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within a AdminProvider');
  return context;
};
