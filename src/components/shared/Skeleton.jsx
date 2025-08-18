import React from 'react';
export default function BlogSkeleton({ variant='card' }) {
  if (variant === 'row') {
    return (
      <div className="skeleton-row">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
      </div>
    );
  }
  return (
    <div className="section-card skeleton-card">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text short" />
    </div>
  );
}
