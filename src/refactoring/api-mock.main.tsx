import AdminProvider from '@provider/admin/AdminProvider.tsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import ApiMockApp from './ApiMockApp.tsx';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return;

  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass', // unhandled 요청은 원래 목적지로 전달
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AdminProvider>
        <ApiMockApp />
      </AdminProvider>
    </React.StrictMode>
  );
});
