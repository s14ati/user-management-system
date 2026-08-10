import React from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EditIcon, TrashIcon, MailIcon, PhoneIcon } from './Icons';

/**
 * UserTable Component
 * Displays user data in a structured responsive table format.
 */
export const UserTable = ({ users, onDeleteClick }) => {
  return (
    <div className="table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const initials = user.name
              ? user.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()
              : 'U';
            const companyName = typeof user.company === 'string' ? user.company : user.company?.name || 'Independent';

            return (
              <tr key={user.id}>
                <td>
                  <div className="table-user-cell">
                    <div className="table-avatar">{initials}</div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{user.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>@{user.username || 'user'}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MailIcon size={14} style={{ color: 'var(--text-muted)' }} />
                    <span>{user.email || 'N/A'}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PhoneIcon size={14} style={{ color: 'var(--text-muted)' }} />
                    <span>{user.phone || 'N/A'}</span>
                  </div>
                </td>
                <td>{companyName}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <Link to={`/user/${user.id}`} className="btn btn-icon-only" title="View Details">
                      <EyeIcon size={16} />
                    </Link>
                    <Link to={`/user/edit/${user.id}`} className="btn btn-icon-only" title="Edit User">
                      <EditIcon size={16} />
                    </Link>
                    <button
                      onClick={() => onDeleteClick(user)}
                      className="btn btn-icon-only"
                      style={{ color: 'var(--danger)' }}
                      title="Delete User"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
