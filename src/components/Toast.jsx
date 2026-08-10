import React from 'react';
import { useUsers } from '../context/UserContext';
import { CheckCircleIcon, AlertCircleIcon, CloseIcon } from './Icons';

/**
 * Toast Container & Item Component
 * Displays temporary popup alerts when API requests complete or fail.
 */
export const ToastContainer = () => {
  const { toasts, removeToast } = useUsers();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {toast.type === 'success' && <CheckCircleIcon size={20} style={{ color: 'var(--success)' }} />}
          {toast.type === 'danger' && <AlertCircleIcon size={20} style={{ color: 'var(--danger)' }} />}
          {toast.type === 'warning' && <AlertCircleIcon size={20} style={{ color: 'var(--warning)' }} />}
          {toast.type === 'info' && <AlertCircleIcon size={20} style={{ color: 'var(--brand-primary)' }} />}
          
          <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: '500' }}>{toast.message}</span>
          
          <button
            onClick={() => removeToast(toast.id)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <CloseIcon size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
