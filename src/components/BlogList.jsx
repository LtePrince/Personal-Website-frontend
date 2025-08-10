'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function BlogList({ blogs, isDarkMode }) {
  const router = useRouter();

  const handleBlogClick = (id) => {
    router.push(`/blog/${encodeURIComponent(id)}`);
  };

  return (
    <div className={`blog-list ${isDarkMode ? 'dark-mode' : ''}`}>
      {blogs.slice(0, 10).map((blog, index) => (
        <div key={index} className="blog-item" onClick={() => handleBlogClick(blog.id)}>
          <div className="blog-content">
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
