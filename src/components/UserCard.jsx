import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, PhoneIcon, GlobeIcon, BuildingIcon, EyeIcon, EditIcon, TrashIcon } from './Icons';

/**
 * UserCard Component
 * Displays basic user info in a card format with direct actions for View, Edit, and Delete.
 */
export const UserCard = ({ user, onDeleteClick }) => {
  // Extract initial for avatar
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
    <div className="user-card">
      <div>
        <div className="user-card-header">
          <div className="user-avatar">{initials}</div>
          <div className="user-meta">
            <h3 className="user-name" title={user.name}>{user.name}</h3>
            <span className="user-username">@{user.username || 'user'}</span>
          </div>
        </div>

        <div className="user-details-list">
          <div className="detail-item" title={user.email}>
            <MailIcon size={16} className="detail-icon" />
            <span className="detail-text">{user.email || 'N/A'}</span>
          </div>

          <div className="detail-item" title={user.phone}>
            <PhoneIcon size={16} className="detail-icon" />
            <span className="detail-text">{user.phone || 'N/A'}</span>
          </div>

          <div className="detail-item" title={companyName}>
            <BuildingIcon size={16} className="detail-icon" />
            <span className="detail-text">{companyName}</span>
          </div>

          {user.website && (
            <div className="detail-item" title={user.website}>
              <GlobeIcon size={16} className="detail-icon" />
              <a
                href={`https://${user.website.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noreferrer"
                className="detail-text"
                style={{ color: 'var(--brand-primary)' }}
                onClick={(e) => e.stopPropagation()}
              >
                {user.website}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="card-actions">
        <Link to={`/user/${user.id}`} className="btn btn-secondary" title="View Full Details">
          <EyeIcon size={16} />
          <span>View</span>
        </Link>

        <Link to={`/user/edit/${user.id}`} className="btn btn-secondary" title="Edit User">
          <EditIcon size={16} />
          <span>Edit</span>
        </Link>

        <button
          onClick={() => onDeleteClick(user)}
          className="btn btn-outline-danger"
          title="Delete User"
          aria-label={`Delete ${user.name}`}
        >
          <TrashIcon size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
