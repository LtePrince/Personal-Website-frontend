'use client';
import React from 'react';
import './BlogSidebar.css';

export default function Sidebar({ isDarkMode }) {
  return (
    <div className={`sidebar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='sidebar-item'>
        <h3 className={isDarkMode ? 'dark-mode' : ''}>最新博客</h3>
        <ul>
          There is nothing.
          {/* <li>博客1</li>
          <li>博客2</li>
          <li>博客3</li> */}
        </ul>
      </div>
      <div className='sidebar-item'>
        <h3 className={isDarkMode ? 'dark-mode' : ''}>最新评论</h3>
        <ul>
        There is nothing.
          {/* <li>评论1</li>
          <li>评论2</li>
          <li>评论3</li> */}
        </ul>
      </div>
    </div>
  );
}