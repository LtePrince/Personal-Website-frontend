// Blog tab switcher (client)
'use client';
import React, { useState } from 'react';
import BlogList from './List';

export default function ContentSwitcher({ blogs = [], isDarkMode }) {
  const [activeTab, setActiveTab] = useState('latest');

  const renderContent = () => {
    switch (activeTab) {
      case 'latest':
        return <div><BlogList blogs={blogs} isDarkMode={isDarkMode} /></div>;
      case 'column':
        return <div className="placeholder-tab">The blogger is working hard to fill it.</div>;
      case 'log':
        return <div className="placeholder-tab">The blogger is working hard to fill it.</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`content-switcher ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="tabs">
        {['latest','column','log'].map(key => (
          <div
            key={key}
            className={`tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {key === 'latest' ? '最新' : key === 'column' ? '专栏' : '日志'}
          </div>
        ))}
      </div>
      <div className="line" />
      <div className="content">{renderContent()}</div>
    </div>
  );
}
