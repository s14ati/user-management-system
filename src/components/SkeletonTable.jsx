import React from 'react';

/**
 * Skeleton Table Loader
 */
export const SkeletonTable = () => {
  const rows = [1, 2, 3, 4, 5, 6];

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
          {rows.map((i) => (
            <tr key={i}>
              <td>
                <div className="table-user-cell">
                  <div className="skeleton skeleton-avatar" style={{ width: '38px', height: '38px' }}></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '80px', height: '0.75rem' }}></div>
                  </div>
                </div>
              </td>
              <td><div className="skeleton skeleton-text" style={{ width: '140px' }}></div></td>
              <td><div className="skeleton skeleton-text" style={{ width: '110px' }}></div></td>
              <td><div className="skeleton skeleton-text" style={{ width: '100px' }}></div></td>
              <td style={{ textAlign: 'right' }}>
                <div className="skeleton" style={{ width: '90px', height: '30px', display: 'inline-block' }}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
