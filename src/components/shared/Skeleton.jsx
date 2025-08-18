import React from 'react';
export default function BlogSkeleton({ variant='card' }) {
  if (variant === 'row') {
    // Match blog list item card structure
    return (
      <div className="blog-item">
        <div className="blog-content skeleton-row">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text short" />
        </div>
      </div>
    );
  }
  // Default card (homepage latest blog style)
  return (
    <div className="section-card skeleton-card">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text short" />
    </div>
  );
}
