import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { UserIcon, UserPlusIcon, SunIcon, MoonIcon, RefreshIcon } from './Icons';

/**
 * Top Navbar Navigation Bar
 */
export const Navbar = () => {
  const { theme, toggleTheme, refreshUsers, loading } = useUsers();
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <UserIcon size={22} />
          </div>
          <span>User<span style={{ color: 'var(--brand-primary)' }}>Pulse</span></span>
        </Link>

        <div className="nav-actions">
          <button
            onClick={refreshUsers}
            className="btn btn-icon-only"
            title="Refresh Data from API"
            disabled={loading}
          >
            <RefreshIcon size={18} className={loading ? 'skeleton-spin' : ''} />
          </button>

          <button
            onClick={toggleTheme}
            className="btn btn-icon-only"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>

          {location.pathname !== '/user/new' && (
            <Link to="/user/new" className="btn btn-primary">
              <UserPlusIcon size={18} />
              <span>Create User</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
