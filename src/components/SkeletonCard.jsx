import React from 'react';

/**
 * Skeleton Card Loader
 * Provides smooth animated placeholder while fetching API data.
 */
export const SkeletonCard = () => {
  return (
    <div className="user-card" style={{ pointerEvents: 'none' }}>
      <div>
        <div className="user-card-header">
          <div className="skeleton skeleton-avatar"></div>
          <div className="user-meta" style={{ flex: 1 }}>
            <div className="skeleton skeleton-text" style={{ width: '70%', height: '1.2rem' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '40%', height: '0.8rem' }}></div>
          </div>
        </div>

        <div className="user-details-list" style={{ marginTop: '1rem' }}>
          <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
        </div>
      </div>

      <div className="card-actions" style={{ marginTop: '1.5rem' }}>
        <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: 'var(--radius-md)' }}></div>
        <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: 'var(--radius-md)' }}></div>
      </div>
    </div>
  );
};
