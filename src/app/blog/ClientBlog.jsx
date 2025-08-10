'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import Sidebar from '@/components/BlogSidebar';
import ContentSwitcher from '@/components/BlogContentSwitcher';

export default function ClientBlog({ blogs }) {
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
        <ContentSwitcher blogs={filteredBlogs} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
