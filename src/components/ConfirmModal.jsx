import React from 'react';
import { AlertCircleIcon, TrashIcon } from './Icons';

/**
 * ConfirmModal Component
 * Prompts the user before executing destructive action (Delete user)
 */
export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div
            style={{
              padding: '0.625rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
              display: 'flex',
            }}
          >
            <AlertCircleIcon size={24} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{title || 'Confirm Action'}</h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
        </p>

        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary" disabled={isLoading}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-primary" style={{ backgroundColor: 'var(--danger)' }} disabled={isLoading}>
            <TrashIcon size={16} />
            <span>{isLoading ? 'Deleting...' : 'Delete User'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
