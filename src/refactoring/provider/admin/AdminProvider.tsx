import { PropsWithChildren, useMemo, useState } from 'react';
import { AdminContext } from '@refactor/provider/admin/context';

const AdminProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAdmin, setAdmin] = useState<Boolean>(false);
  const toggleAdmin = () => setAdmin((prev) => !prev);

  const value = useMemo(() => ({ isAdmin, toggleAdmin }), [isAdmin]);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
