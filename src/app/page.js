'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import "./page.css";

export default function Home() {
  // 从 localStorage 中读取主题设置
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    setIsClient(true); // 标记客户端已初始化
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }

    fetch('http://localhost:8080/pages/LatestBlog')
      .then(res => res.json())
      .then(data => setLatestBlog(data))
      .catch(() => setLatestBlog(null));
  }, []);

  // 切换主题,当主题切换时，将设置保存到 localStorage
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  };

  if (!isClient) {
    return null; // 在客户端初始化完成之前不渲染
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`} >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <HomePage isDarkMode={isDarkMode} latestBlog={latestBlog} />    
    </div>
  );
}
