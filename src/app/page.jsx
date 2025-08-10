'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HomePage from '@/components/HomePage';
import '@/styles/components/index.css';

// Removed metadata export because this is a client component.
// Page-level SEO can be handled by the root layout or by converting this page to a server component later.

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('isDarkMode');
    if (saved) setIsDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    fetch('/api/LatestBlog')
      .then(res => res.json())
      .then(data => setLatestBlog(data))
      .catch(() => setLatestBlog(null));
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('isDarkMode', JSON.stringify(next));
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <HomePage isDarkMode={isDarkMode} latestBlog={latestBlog} />
    </div>
  );
}
