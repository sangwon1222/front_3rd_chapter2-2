import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import CouponProvider from '@provider/coupon/CouponProvider';
import AdminProvider from '@provider/admin/AdminProvider';
import ItemProvider from '@provider/item/ItemProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AdminProvider>
    <CouponProvider>
      <ItemProvider>
        <App />
      </ItemProvider>
    </CouponProvider>
  </AdminProvider>
  // </React.StrictMode>
);
