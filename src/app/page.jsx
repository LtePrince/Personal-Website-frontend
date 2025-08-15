"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import SystemOverview from '@/components/SystemOverview';
import LatestSaysSection from '@/components/LatestSaysSection';
import FriendLinks from '@/components/FriendLinks';
import LatestBlogSection from '@/components/LatestBlogSection';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('isDarkMode');
    if (saved) setIsDarkMode(JSON.parse(saved));
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('isDarkMode', JSON.stringify(next));
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <SystemOverview isDarkMode={isDarkMode} />
      <LatestBlogSection isDarkMode={isDarkMode} />
      <LatestSaysSection isDarkMode={isDarkMode} />
      <FriendLinks isDarkMode={isDarkMode} />
    </div>
  );
}
