"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
// 为避免偶发的 SSR/CSR 图标差异导致的水合问题，SystemOverview 关闭 SSR
const SystemOverviewNoSSR = dynamic(() => import('@/components/SystemOverview'), { ssr: false });
import LatestSaysSection from '@/components/LatestSaysSection';
import FriendLinks from '@/components/FriendLinks';

export default function HomeClientShell({ serverLatestBlogSlot }) {
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
  <SystemOverviewNoSSR isDarkMode={isDarkMode} />
  {serverLatestBlogSlot}
      <LatestSaysSection isDarkMode={isDarkMode} />
      <FriendLinks isDarkMode={isDarkMode} />
    </div>
  );
}
