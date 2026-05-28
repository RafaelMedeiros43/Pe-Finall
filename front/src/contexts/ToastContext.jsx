import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/Toast/Toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((text, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter(x => x.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const hide = useCallback((id) => {
    setToasts((t) => t.filter(x => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hide} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
