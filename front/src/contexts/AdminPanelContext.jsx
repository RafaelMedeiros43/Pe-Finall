import React, { createContext, useContext, useState } from 'react';

const AdminPanelContext = createContext(null);

export function AdminPanelProvider({ children }) {
  const [showAdmin, setShowAdmin] = useState(false);
  return (
    <AdminPanelContext.Provider value={{ showAdmin, setShowAdmin }}>
      {children}
    </AdminPanelContext.Provider>
  );
}

export function useAdminPanel() {
  const ctx = useContext(AdminPanelContext);
  if (!ctx) throw new Error('useAdminPanel must be used within AdminPanelProvider');
  return ctx;
}
