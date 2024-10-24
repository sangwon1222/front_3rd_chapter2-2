import AdminProvider from '@refactor/provider/admin/AdminProvider.tsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import StorageMockApp from './StorageMockApp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminProvider>
      <StorageMockApp />
    </AdminProvider>
  </React.StrictMode>
);
