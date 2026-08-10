import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { ArrowLeftIcon, UserPlusIcon, EditIcon, CheckCircleIcon } from '../components/Icons';
import { fetchUserById } from '../services/api';

/**
 * UserFormPage Component (Task 2: Create User & Task 3: Update User)
 * Reusable form handling both creation and pre-filled modification of user profiles.
 */
export const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allUsersRaw, addUser, editUser, addToast } = useUsers();

  const isEditMode = Boolean(id);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    companyName: '',
    street: '',
    city: '',
    zipcode: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingUser, setLoadingUser] = useState(isEditMode);

  // Populate data when in Edit Mode
  useEffect(() => {
    if (!isEditMode) return;

    const populateForm = (user) => {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        companyName: typeof user.company === 'string' ? user.company : user.company?.name || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        zipcode: user.address?.zipcode || '',
      });
    };

    // First check local React Context state for instant performance
    const localUser = allUsersRaw.find((u) => String(u.id) === String(id));
    if (localUser) {
      populateForm(localUser);
      setLoadingUser(false);
    } else {
      // Fallback: Fetch directly from API if refreshed on page
      fetchUserById(id)
        .then((fetchedUser) => {
          populateForm(fetchedUser);
        })
        .catch((err) => {
          addToast('Failed to load user details for editing', 'danger');
          navigate('/');
        })
        .finally(() => {
          setLoadingUser(false);
        });
    }
  }, [id, isEditMode, allUsersRaw, navigate, addToast]);

  // Form Field Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Client-Side Input Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler (Executes POST for Create or PUT for Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      username: formData.username.trim() || formData.name.toLowerCase().replace(/\s+/g, '_'),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website: formData.website.trim(),
      company: {
        name: formData.companyName.trim() || 'Independent',
      },
      address: {
        street: formData.street.trim() || 'Main St',
        city: formData.city.trim() || 'Metropolis',
        zipcode: formData.zipcode.trim() || '10001',
      },
    };

    try {
      if (isEditMode) {
        // Perform PUT request to JSONPlaceholder API
        await editUser(id, payload);
      } else {
        // Perform POST request to JSONPlaceholder API
        await addUser(payload);
      }
      navigate('/');
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUser) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p className="skeleton-spin" style={{ display: 'inline-block', fontSize: '2rem' }}>⌛</p>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading user information...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-secondary" style={{ display: 'inline-flex', gap: '0.5rem' }}>
          <ArrowLeftIcon size={18} />
          <span>Back to Users</span>
        </Link>
      </div>

      <div className="form-container">
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isEditMode ? <EditIcon size={24} style={{ color: 'var(--brand-primary)' }} /> : <UserPlusIcon size={24} style={{ color: 'var(--brand-primary)' }} />}
            <span>{isEditMode ? 'Edit User Details' : 'Create New User'}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEditMode
              ? 'Modify the user details below. Changes will be saved via PUT request.'
              : 'Fill out the form to register a new user via POST request to JSONPlaceholder.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid two-cols" style={{ marginBottom: '1.25rem' }}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. Swati Sharma"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            {/* Username */}
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                className="form-input"
                placeholder="e.g. swati_s"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid two-cols" style={{ marginBottom: '1.25rem' }}>
            {/* Email Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="e.g. swati@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="text"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="e.g. 1-770-736-8031"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-grid two-cols" style={{ marginBottom: '1.25rem' }}>
            {/* Company Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="companyName">Company Name</label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                className="form-input"
                placeholder="e.g. Romaguera-Crona"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            {/* Website */}
            <div className="form-group">
              <label className="form-label" htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                className="form-input"
                placeholder="e.g. hildegard.org"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address Fields Accordion Header */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Address Information (Optional)</h4>
          </div>

          <div className="form-grid two-cols" style={{ marginBottom: '2rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="street">Street Address</label>
              <input
                id="street"
                type="text"
                name="street"
                className="form-input"
                placeholder="Kulas Light"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                className="form-input"
                placeholder="Gwenborough"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <CheckCircleIcon size={18} />
              <span>{isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : isEditMode ? 'Update User' : 'Create User'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
