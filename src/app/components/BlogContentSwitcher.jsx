'use client';
import React, { useState } from 'react';
import BlogList from '@/app/components/BlogList';
import './BlogContentSwitcher.css';

export default function ContentSwitcher({blogs, isDarkMode }) {
  const [activeTab, setActiveTab] = useState('latest');

  const renderContent = () => {
    switch (activeTab) {
      case 'latest':
        return <div><BlogList blogs={blogs} isDarkMode={isDarkMode} /></div>;
      case 'column':
        return <div style={{fontSize: '25px', textAlign: 'center', padding: '100px'}}>The blogger is working hard to fill it.</div>;
      case 'log':
        return <div style={{fontSize: '25px', textAlign: 'center', padding: '100px'}}>The blogger is working hard to fill it.</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`content-switcher ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'latest' ? 'active' : ''}`}
          onClick={() => setActiveTab('latest')}
        >
          最新
        </div>
        <div
          className={`tab ${activeTab === 'column' ? 'active' : ''}`}
          onClick={() => setActiveTab('column')}
        >
          专栏
        </div>
        <div
          className={`tab ${activeTab === 'log' ? 'active' : ''}`}
          onClick={() => setActiveTab('log')}
        >
          日志
        </div>
      </div>
      <div className="line"></div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}