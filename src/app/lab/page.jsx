'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import '@/styles/components/index.css';

export default function LabPage() {
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
    </div>
  );
}
