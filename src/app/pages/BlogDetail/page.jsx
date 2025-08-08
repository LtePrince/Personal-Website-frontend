'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/app/components/Navbar';
import Comments from '@/app/components/Comments';
import Giscus from '@giscus/react';
import './page.css';

export default function BlogDetailPageWrapper() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <BlogDetail />
    </Suspense>
  );
}

function BlogDetail() {
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
      fetch(`https://whalefallsea.xyz/api/BlogDetail?id=${blogID}`)
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
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
        <button
          onClick={() => window.location.href = '/pages/Blog'}
          style={{
            background: 'none',
            border: 'none',
            color: isDarkMode ? '#f5d46f' : '#333',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            padding: 0
          }}
        >
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Return
        </button>
      </div>
      <hr style={{ margin: '0 0 24px 0', borderColor: isDarkMode ? '#444' : '#ccc' }} />
      
        <div className="markdown-body">
          {markdownContent ? (
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          ) : (
            <p>加载中...</p>
          )}
        </div>
      </div>
      {/* <Comments blogID={blogID} isDarkMode={isDarkMode} /> */}
      <div className={`giscus-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Giscus
        repo="LtePrince/Discussion"
        repoId="R_kgDOOr48BQ"
        category="Q&A"
        categoryId="DIC_kwDOOr48Bc4CqR-D"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        // theme="preferred_color_scheme"
        theme={isDarkMode ? "dark" : "light"}
        lang="en"
        // loading="lazy"
        strict='0'
      />
      </div>
    </div>
  );
}