import React from 'react';
import './toast.css';

export default function ToastContainer({ toasts = [], onClose = () => {} }) {
  return (
    <div className="toast-root" aria-live="polite" aria-atomic="true">
      {toasts.map(t => (
        <div key={t.id} className={`toast-item ${t.type}`} role="status">
          <div className="toast-text">{t.text}</div>
          <button className="toast-close" onClick={() => onClose(t.id)} aria-label="Fechar">×</button>
        </div>
      ))}
    </div>
  );
}
