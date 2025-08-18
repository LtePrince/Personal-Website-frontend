"use client";
import React from 'react';
import { FaLink } from 'react-icons/fa';
export default function FriendLinks({ isDarkMode }) {
	const links = [ { id:1, name:'Next.js', url:'https://nextjs.org' } ];
	return (
		<section className={`section-container friend-links ${isDarkMode ? 'dark-mode' : ''}`}>
			<h2 className={isDarkMode ? 'dark-mode' : ''}><FaLink /> Friend Links</h2>
			<div className="section-card"><ul className="links-list">{links.map(l => <li key={l.id}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.name}</a></li>)}</ul></div>
		</section>
	);
}
