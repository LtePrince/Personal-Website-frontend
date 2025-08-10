'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Navbar component (state-driven mobile menu)
 */
export default function Navbar({ isDarkMode, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // 非受控模式下的内部主题状态
  const [internalDarkMode, setInternalDarkMode] = useState(false);

  // 仅在未受控时，从 localStorage 恢复主题
  useEffect(() => {
    const controlled = typeof isDarkMode === 'boolean' && typeof toggleTheme === 'function';
    if (!controlled) {
      try {
        const saved = localStorage.getItem('isDarkMode');
        if (saved != null) setInternalDarkMode(JSON.parse(saved));
      } catch {}
    }
  }, [isDarkMode, toggleTheme]);

  const controlled = typeof isDarkMode === 'boolean' && typeof toggleTheme === 'function';
  const effectiveDarkMode = controlled ? isDarkMode : internalDarkMode;
  const handleToggle = controlled
    ? toggleTheme
    : () => {
        const next = !internalDarkMode;
        setInternalDarkMode(next);
        try { localStorage.setItem('isDarkMode', JSON.stringify(next)); } catch {}
      };

  return (
    <nav className={`navbar ${effectiveDarkMode ? 'dark-mode' : ''}`}>
      <div className="logo">
        <a href="/">
          <Image src="/images/profile_photo.png" alt="Logo" width={40} height={40} />
        </a>
        <strong className={effectiveDarkMode ? 'dark-mode' : ''}>Adolph's Blog</strong>
      </div>
      <div className="nav-links">
        <Link href={'/'} className={`hidden md:block ${effectiveDarkMode ? 'dark-mode' : ''}`}>Home</Link>
        <Link href={'/blog'} className={`hidden md:block ${effectiveDarkMode ? 'dark-mode' : ''}`}>Blogs</Link>
        <Link href={'/lab'} className={`hidden md:block ${effectiveDarkMode ? 'dark-mode' : ''}`}>MyLab</Link>
        {/* Apple 风格主题开关：首屏结构稳定，交互统一 */}
        <div
          className={`theme-switch${effectiveDarkMode ? ' switch-on dark-mode' : ''}`}
          onClick={handleToggle}
          role="button"
          aria-label="Toggle theme"
          aria-pressed={effectiveDarkMode}
        >
          <span className="switch" aria-hidden="true" />
        </div>
        <button className='block md:hidden ml-4' onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-menu">
          <Image src={effectiveDarkMode ? '/images/menu_dark.png' : '/images/menu.png'} alt="Menu" className='small-screen-menu' width={25} height={25} />
        </button>
      </div>

      <ul id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''} ${effectiveDarkMode ? 'dark-mode' : ''}`}>
        <div className='flex close-btn-row'>
          <button className='block md:hidden ml-4' onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <Image src={effectiveDarkMode ? '/images/close_dark.png' : '/images/close.png'} alt="Close" className='w-5 cursor-pointer' width={20} height={20} />
          </button>
        </div>
        <div className='h-10'></div>
        <li><Link href={'/'} onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link href={'/blog'} onClick={() => setMenuOpen(false)}>Blogs</Link></li>
        <li><Link href={'/lab'} onClick={() => setMenuOpen(false)}>MyLab</Link></li>
        <li><a href="#Connect" onClick={() => setMenuOpen(false)}>Connect me</a></li>
      </ul>
    </nav>
  );
}
