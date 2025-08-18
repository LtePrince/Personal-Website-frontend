'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import SystemOverview from '@/components/home/SystemOverview';
import LatestSaysSection from '@/components/home/LatestSaysSection';
import FriendLinks from '@/components/home/FriendLinks';
import LatestBlogSection from './LatestBlogSection';
import '@/styles/components/index.css';

export default function HomeClientShell({ blogs }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    try { const saved = localStorage.getItem('isDarkMode'); if (saved) setIsDarkMode(JSON.parse(saved)); } catch {}
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    try { localStorage.setItem('isDarkMode', JSON.stringify(next)); } catch {}
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <SystemOverview isDarkMode={isDarkMode} />
      <LatestBlogSection blogs={blogs} />
      <LatestSaysSection isDarkMode={isDarkMode} />
      <FriendLinks isDarkMode={isDarkMode} />
    </div>
  );
}
