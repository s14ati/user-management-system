import React from 'react';

/**
 * Footer Component
 */
export const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ maxWdith: '1280px', margin: '0 auto' }}>
        <p>© {new Date().getFullYear()} UserPulse App • React CRUD Assignment with JSONPlaceholder API</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Built with React Hooks, React Router v6, CSS Custom Properties & RESTful endpoints
        </p>
      </div>
    </footer>
  );
};
