import React from 'react';
import './BlogList.css';

export default function BlogList({ blogs, isDarkMode }) {
  return (
    <div className={`blog-list ${isDarkMode ? 'dark-mode' : ''}`}>
      {blogs.slice(0, 10).map((blog, index) => (
        <div key={index} className="blog-item">
          <div className="blog-content">
            <h3>{blog.title}</h3>
            <p className="date">{blog.date}</p>
            <p>{blog.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}