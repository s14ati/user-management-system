import React, { useState } from 'react';
import { useUsers } from '../context/UserContext';
import { UserCard } from '../components/UserCard';
import { UserTable } from '../components/UserTable';
import { SkeletonCard } from '../components/SkeletonCard';
import { SkeletonTable } from '../components/SkeletonTable';
import { ConfirmModal } from '../components/ConfirmModal';
import { SearchIcon, GridIcon, ListIcon, UserPlusIcon, UserIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

/**
 * Home View Component (Task 1 & Task 4)
 * Displays user dashboard with search, sorting, grid/table view toggle, and delete flow.
 */
export const Home = () => {
  const {
    users,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    removeUser,
    refreshUsers,
  } = useUsers();

  // State for delete modal target user
  const [deletingUser, setDeletingUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Trigger modal
  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    setIsDeleting(true);
    try {
      await removeUser(deletingUser.id);
      setDeletingUser(null);
    } catch (err) {
      console.error('Delete error', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="header-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1>User Directory</h1>
            <span
              style={{
                backgroundColor: 'var(--brand-light)',
                color: 'var(--brand-primary)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              {loading ? '...' : `${users.length} Users`}
            </span>
          </div>
          <p className="header-subtitle">
            Manage your team members and users efficiently with real-time API simulation.
          </p>
        </div>
      </div>

      {/* Controls Bar (Search, Sort, View Toggle) */}
      <div className="controls-bar">
        <div className="search-box">
          <SearchIcon size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Sort by:</label>
          <select
            className="select-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id">Default (ID)</option>
            <option value="name">Name (A - Z)</option>
            <option value="company">Company Name</option>
          </select>

          <div className="view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Grid View"
              aria-label="Grid View"
            >
              <GridIcon size={18} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              title="Table View"
              aria-label="Table View"
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* API Error Notification Banner */}
      {error && (
        <div
          style={{
            backgroundColor: 'var(--danger-light)',
            color: 'var(--danger)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{error}</span>
          <button onClick={refreshUsers} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            Retry Fetching
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        viewMode === 'grid' ? (
          <div className="users-grid">
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <SkeletonCard key={key} />
            ))}
          </div>
        ) : (
          <SkeletonTable />
        )
      )}

      {/* Main Users Content */}
      {!loading && !error && (
        users.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="users-grid">
              {users.map((user) => (
                <UserCard key={user.id} user={user} onDeleteClick={handleDeleteClick} />
              ))}
            </div>
          ) : (
            <UserTable users={users} onDeleteClick={handleDeleteClick} />
          )
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <UserIcon size={48} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Users Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {searchQuery ? `No users match "${searchQuery}". Try clearing search filters.` : 'The users list is currently empty.'}
            </p>
            {searchQuery ? (
              <button onClick={() => setSearchQuery('')} className="btn btn-secondary">
                Clear Search
              </button>
            ) : (
              <Link to="/user/new" className="btn btn-primary">
                <UserPlusIcon size={18} />
                <span>Add First User</span>
              </Link>
            )}
          </div>
        )
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingUser)}
        title="Delete User"
        message={`Are you sure you want to delete "${deletingUser?.name}"? This action simulates a DELETE request to JSONPlaceholder API.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingUser(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};
