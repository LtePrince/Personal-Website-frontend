'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import SearchBar from '@/components/blog/SearchBar';
import Sidebar from '@/components/blog/Sidebar';
import * as ContentSwitcherModule from '@/components/blog/ContentSwitcher';
const ContentSwitcher = ContentSwitcherModule.default || ContentSwitcherModule;

// 物理迁移自 app/blog/ClientBlog.jsx
export default function ClientBlog({ blogs = [] }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) setIsDarkMode(JSON.parse(savedTheme));
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('isDarkMode', JSON.stringify(next));
  };

  const filteredBlogs = useMemo(() => {
    if (!query) return blogs;
    return blogs.filter(b => b.title?.toLowerCase().includes(query.toLowerCase()));
  }, [blogs, query]);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <SearchBar onSearch={setQuery} isDarkMode={isDarkMode} />
      <div className="BlogMain">
        <Sidebar isDarkMode={isDarkMode} />
        {typeof ContentSwitcher === 'function' ? (
          <ContentSwitcher blogs={filteredBlogs} isDarkMode={isDarkMode} />
        ) : (
          <div style={{padding:20,color:'red'}}>ContentSwitcher 加载失败: 类型 {typeof ContentSwitcher}</div>
        )}
      </div>
    </div>
  );
}
