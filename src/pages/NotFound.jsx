import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, AlertCircleIcon } from '../components/Icons';

/**
 * 404 Not Found Page Component
 */
export const NotFound = () => {
  return (
    <div className="empty-state" style={{ padding: '5rem 2rem' }}>
      <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
        <AlertCircleIcon size={64} />
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem' }}>
        The page you are looking for doesn't exist or has been moved. Return to the homepage to manage users.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeftIcon size={18} />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};
