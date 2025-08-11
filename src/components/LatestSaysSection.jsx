'use client';
import React, { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';

export default function LatestSaysSection({ isDarkMode }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 预留：未来从后端获取最新说说列表
    // const pubBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    // const base = pubBase ? pubBase.replace(/\/$/, '') : '';
    // const url = base ? `${base}/LatestSays` : '/api/LatestSays';
    // fetch(url).then(r => r.json()).then(setItems).catch(() => setItems([]));

    // 暂时用占位数据
    setItems([
      { id: 1, text: 'Say1' },
      { id: 2, text: 'Say2' },
      { id: 3, text: 'Say3' },
    ]);
  }, []);

  return (
    <section className={`latest-says-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2 className={isDarkMode ? 'dark-mode' : ''}><FaCommentDots /> Latest Says</h2>
      <div className="section-card">
        <ul className="says-list">
          {items.map((it) => (
            <li key={it.id}>{it.text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
