"use client";
import React, { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
export default function LatestSaysSection({ isDarkMode }) {
	const [items, setItems] = useState([]);
	useEffect(() => { setItems([{ id:1,text:'Say1'},{ id:2,text:'Say2'},{ id:3,text:'Say3'}]); }, []);
	return (
		<section className={`latest-says-section ${isDarkMode ? 'dark-mode' : ''}`}>
			<h2 className={isDarkMode ? 'dark-mode' : ''}><FaCommentDots /> Latest Says</h2>
			<div className="section-card"><ul className="says-list">{items.map(it => <li key={it.id}>{it.text}</li>)}</ul></div>
		</section>
	);
}
