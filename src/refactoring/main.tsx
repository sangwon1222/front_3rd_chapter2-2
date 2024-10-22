import AdminProvider from '@refactor/provider/AdminProvider.tsx';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);
