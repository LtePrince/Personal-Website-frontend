"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Markdown from '@/components/shared/Markdown';
import Comments from '@/components/shared/Comments';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

export default function ClientDetail({ id, data }) {
	const router = useRouter();
	const [isDarkMode, setIsDarkMode] = useState(false);
	useEffect(() => { try { const saved = localStorage.getItem('isDarkMode'); if (saved != null) setIsDarkMode(JSON.parse(saved)); } catch {} }, []);
	const toggleTheme = () => { const next = !isDarkMode; setIsDarkMode(next); try { localStorage.setItem('isDarkMode', JSON.stringify(next)); } catch {} };
	return (
		<div className={`app-container ${isDarkMode ? 'dark-mode' : ''} blog-detail-container`}>
			<Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
			<div className={`${isDarkMode ? 'dark-mode ' : ''}blog-detail-content`}>
				<div style={{ display:'flex', alignItems:'center', padding:'12px 0' }}>
					<button onClick={() => { router.push('/blog'); }} aria-label="返回博客列表" style={{ background:'none', border:'none', color: isDarkMode ? '#f5d46f' : '#333', cursor:'pointer', fontSize:'1.2rem', display:'flex', alignItems:'center', padding:0 }}>
						<FaArrowLeft size={20} style={{ marginRight:8, flexShrink:0 }} />
						Return
					</button>
				</div>
				<hr style={{ margin:'0 0 24px 0' }} />
				<div className="markdown-body">
					{data?.text ? <Markdown>{data.text}</Markdown> : <p>加载中...</p>}
				</div>
			</div>
			<div className={`${isDarkMode ? 'dark-mode ' : ''}giscus-container`}>
				<Comments theme={isDarkMode ? 'dark' : 'light'} />
			</div>
		</div>
	);
}
