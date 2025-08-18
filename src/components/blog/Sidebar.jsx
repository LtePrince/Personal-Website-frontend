'use client';
import React from 'react';

export default function BlogSidebar({ isDarkMode }) {
  return (
    <div className={`sidebar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='sidebar-item'>
        <h3 className={isDarkMode ? 'dark-mode' : ''}>最新博客</h3>
        <ul>There is nothing.</ul>
      </div>
      <div className='sidebar-item'>
        <h3 className={isDarkMode ? 'dark-mode' : ''}>最新评论</h3>
        <ul>There is nothing.</ul>
      </div>
    </div>
  );
}
