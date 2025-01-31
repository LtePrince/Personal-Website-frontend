import React, { useEffect, useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar" style={{ opacity: Math.max(1 - scrollY / 100, 0), transform: `scale(${Math.max(1 - scrollY / 200, 0.5)})` }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索博客..."
      />
      <button type="submit">搜索</button>
    </form>
  );
}