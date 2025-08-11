'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function ClientLatestBlogCard({ blog }) {
  const router = useRouter();
  const goDetail = () => {
    if (!blog?.id) return;
    router.push(`/blog/${encodeURIComponent(blog.id)}`);
  };
  return (
    <div className="section-card" role="article" onClick={goDetail}>
      {blog ? (
        <>
          <h3 className="section-title">{blog.title}</h3>
          <p className="section-meta">Published on: {blog.date}</p>
          <p className="section-summary">{blog.summary}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
