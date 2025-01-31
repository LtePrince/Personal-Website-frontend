'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "@/app/components/Navbar";
import SearchBar from '@/app/components/SearchBar';
import BlogList from '@/app/components/BlogList';
import Sidebar from '@/app/components/BlogSidebar';
import ContentSwitcher from '@/app/components/BlogContentSwitcher'
import './page.css';

export default function Blog() {
	// 从 localStorage 中读取主题设置
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }

    // 向后端发送请求获取博客数据
    fetch('http://localhost:8080/pages/Blog')
      .then(response => response.json())
      .then(data => {
        setBlogs(data);
        setFilteredBlogs(data);
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  // 切换主题,当主题切换时，将设置保存到 localStorage
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  };

  const handleSearch = (query) => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

	return (
		<div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`} >
			<Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode}/>
      <div className="BlogMain">
        <Sidebar isDarkMode={isDarkMode} />
        <ContentSwitcher blogs={filteredBlogs} isDarkMode={isDarkMode} />
      </div>
		</div>
	)
}