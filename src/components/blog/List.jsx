'use client';
import React from 'react';
import BlogSkeleton from '@/components/shared/Skeleton';
import { useRouter } from 'next/navigation';

export default function BlogList({ blogs = [], isDarkMode }) {
  const router = useRouter();
  const go = id => router.push(`/blog/${encodeURIComponent(id)}`);
  if (!blogs || blogs.length === 0) {
    return (
      <div className={`blog-list ${isDarkMode ? 'dark-mode' : ''}`}>
        {Array.from({ length: 5 }).map((_,i) => <BlogSkeleton key={i} variant="row" />)}
      </div>
    );
  }
  return <div className={`blog-list ${isDarkMode ? 'dark-mode' : ''}`}>{blogs.slice(0,10).map(b => (
    <div key={b.id} className="blog-item" onClick={() => go(b.id)}>
      <div className="blog-content">
        <h3>{b.title}</h3>
        <p>{b.summary}</p>
      </div>
    </div>
  ))}</div>;
}
