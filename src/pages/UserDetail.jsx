import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { fetchUserById, fetchUserPosts } from '../services/api';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  ArrowLeftIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  BuildingIcon,
  MapPinIcon,
  EditIcon,
  TrashIcon,
} from '../components/Icons';

/**
 * UserDetail Component
 * Detailed view for individual user profiles, contact info, address location,
 * and authored blog posts fetched from JSONPlaceholder API.
 */
export const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allUsersRaw, removeUser, addToast } = useUsers();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadData = async () => {
      try {
        // Find in local state or fetch from API
        const localUser = allUsersRaw.find((u) => String(u.id) === String(id));
        let userData = localUser;

        if (!userData) {
          userData = await fetchUserById(id);
        }

        if (isMounted) {
          setUser(userData);
        }

        // Fetch posts for this user
        try {
          const postsData = await fetchUserPosts(id);
          if (isMounted) {
            setPosts(postsData.slice(0, 4)); // Show first 4 posts for clean preview
          }
        } catch (postsErr) {
          console.warn('Could not fetch posts for user', postsErr);
        }
      } catch (err) {
        if (isMounted) {
          setError('User not found or failed to load user details.');
          addToast('Error loading user profile', 'danger');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id, allUsersRaw, addToast]);

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await removeUser(user.id);
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-container">
        <div className="skeleton" style={{ height: '220px', borderRadius: 'var(--radius-xl)' }}></div>
        <div className="detail-grid-cards">
          <div className="skeleton" style={{ height: '180px', borderRadius: 'var(--radius-lg)' }}></div>
          <div className="skeleton" style={{ height: '180px', borderRadius: 'var(--radius-lg)' }}></div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="empty-state">
        <h2 style={{ marginBottom: '1rem', color: 'var(--danger)' }}>User Profile Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          The requested user profile ID ({id}) could not be retrieved from the server.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeftIcon size={18} />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const companyName = typeof user.company === 'string' ? user.company : user.company?.name || 'N/A';
  const catchPhrase = user.company?.catchPhrase || 'Delivering high-quality professional services.';

  const fullAddress = user.address
    ? `${user.address.suite ? user.address.suite + ', ' : ''}${user.address.street || ''}, ${user.address.city || ''} ${user.address.zipcode || ''}`
    : 'Address not available';

  return (
    <div className="detail-container">
      {/* Back Navigation & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" className="btn btn-secondary">
          <ArrowLeftIcon size={18} />
          <span>Back to All Users</span>
        </Link>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to={`/user/edit/${user.id}`} className="btn btn-secondary">
            <EditIcon size={16} />
            <span>Edit Profile</span>
          </Link>
          <button onClick={() => setShowDeleteModal(true)} className="btn btn-outline-danger">
            <TrashIcon size={16} />
            <span>Delete Profile</span>
          </button>
        </div>
      </div>

      {/* Main Banner Header */}
      <div className="detail-banner">
        <div className="detail-header-flex">
          <div className="detail-avatar-large">{initials}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{user.name}</h1>
            <p style={{ opacity: 0.9, fontSize: '1rem', marginTop: '0.25rem' }}>
              @{user.username || 'user'} • <span style={{ opacity: 0.8 }}>ID: #{user.id}</span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem', fontSize: '0.9rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
                <MailIcon size={16} /> {user.email}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
                <PhoneIcon size={16} /> {user.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="detail-grid-cards">
        {/* Company Card */}
        <div className="info-card">
          <h3>
            <BuildingIcon size={20} />
            <span>Company Information</span>
          </h3>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            {companyName}
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1rem' }}>
            "{catchPhrase}"
          </p>
          {user.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <GlobeIcon size={16} style={{ color: 'var(--brand-primary)' }} />
              <a
                href={`https://${user.website.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--brand-primary)', fontWeight: 600 }}
              >
                {user.website}
              </a>
            </div>
          )}
        </div>

        {/* Location & Address Card */}
        <div className="info-card">
          <h3>
            <MapPinIcon size={20} />
            <span>Address & Location</span>
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
            {fullAddress}
          </p>
          {user.address?.geo && (
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Geo Coordinates: Lat {user.address.geo.lat}, Lng {user.address.geo.lng}
            </div>
          )}
        </div>
      </div>

      {/* User Authored Posts (Bonus API integration) */}
      {posts.length > 0 && (
        <div className="info-card" style={{ marginTop: '0.5rem' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>Recent Articles & Posts ({posts.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h4 style={{ textTransform: 'capitalize', fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  {post.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Profile"
        message={`Are you sure you want to remove ${user.name}? This will perform a simulated DELETE API call.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={isDeleting}
      />
    </div>
  );
};
