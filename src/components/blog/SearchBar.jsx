'use client';
import React, { useEffect, useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);
  const submit = e => { e.preventDefault(); onSearch?.(query); };
  return (
    <form onSubmit={submit} className="search-bar" style={{ opacity: Math.max(1 - scrollY / 100, 0), transform: `scale(${Math.max(1 - scrollY / 200, 0.5)})` }}>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索博客..." />
      <button type="submit">搜索</button>
    </form>
  );
}
