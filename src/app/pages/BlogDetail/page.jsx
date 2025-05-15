'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/app/components/Navbar';
import './page.css';

export default function BlogDetail() {
  const searchParams = useSearchParams();
  const blogID = searchParams.get('id'); // 从 URL 参数中获取博客标题
  const [markdownContent, setMarkdownContent] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 从 localStorage 中读取主题设置
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }

    // 根据标题向后端请求博客的 Markdown 文件
    if (blogID) {
      fetch(`http://localhost:8080/pages/BlogDetail?id=${blogID}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch blog content');
          }
          return response.json(); // 直接解析为JSON
        })
        .then(json => setMarkdownContent(json.text))
        .catch(error => console.error('Error fetching blog content:', error));
    }
  }, [blogID]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  };

  return (
    <div className={`blog-detail-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className={`blog-detail-content ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* <div>
          <button
            onClick={() => window.location.href = '/pages/Blog'}
            style={{
              padding: '8px 18px',
              fontSize: '1.2rem',
              borderRadius: '6px',
              border: 'none',
              background: isDarkMode ? '#333' : '#f5d46f',
              color: isDarkMode ? '#fbf9f7' : '#222',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            return Blog Page
          </button>
        </div> */}
        <div className="markdown-body">
          {markdownContent ? (
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          ) : (
            <p>加载中...</p>
          )}
        </div>
      </div>
    </div>
  );
}