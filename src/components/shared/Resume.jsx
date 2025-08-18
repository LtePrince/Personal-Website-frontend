'use client';
import React from 'react';
import { FaGithub, FaTelegram, FaEnvelope, FaGraduationCap} from 'react-icons/fa';
export default function Resume({ isDarkMode }) {
	return (
		<main className={`main-content ${isDarkMode ? 'dark-mode' : ''}`}>
			<section id="Start" className="intro">
				<h1 className={isDarkMode ? 'dark-mode' : ''}>Welcome to Whalefall's Blog</h1>
				<p>This site showcases my resume, interests, and skills.</p>
			</section>
			<section className="education">
				<h2 className={isDarkMode ? 'dark-mode' : ''}>Education</h2>
				<ul className="education-list">
					<li><span className="edu-icon"><FaGraduationCap size={24} /></span>The University of Sydney, Master of Science in Computer Science, 2025-today</li>
					<li><span className="edu-icon"><FaGraduationCap size={24} /></span>Huazhong University of Science and Technology, Bachelor of Science in Computer Science, 2021-2025</li>
				</ul>
			</section>
			<section className="interests">
				<h2 className={isDarkMode ? 'dark-mode' : ''}>Interests</h2>
				<ul>
					<li>ACGN, Role-Playing Language Agents</li>
					<li>Zero-Knowledge Proof</li>
					<li>Neural Network and AI Technology</li>
				</ul>
			</section>
			<section className="skills">
				<h2 className={isDarkMode ? 'dark-mode' : ''}>Skills</h2>
				<ul>
					<li>Proficient in GPU parallel programming (CUDA)</li>
					<li>Fully Homomorphic Encryption (FHE) and Groth16 zkSNARK protocol</li>
					<li>Frontend Development (React, HTML, CSS)</li>
					<li>Backend Development (Golang, Node.js)</li>
				</ul>
			</section>
			<section id="Connect" className="connect-me">
				<h2 className={isDarkMode ? 'dark-mode' : ''}>Connect with Me</h2>
				<div className="social-icons">
					<a href="https://github.com/LtePrince" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub size={32} /></a>
					<a href="https://t.me/Adolph_King" target="_blank" rel="noopener noreferrer" title="Telegram"><FaTelegram size={32} /></a>
					<a href="mailto:15527318701@163.com" title="Email"><FaEnvelope size={32} /></a>
					<a href="https://space.bilibili.com/529238077?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" title="Bilibili"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-6zm5-7l2 3m6-3l-2 3m-5 7v-2m6 0v2"/></svg></a>
				</div>
			</section>
		</main>
	);
}
// 移除冗余的再导出避免重复 default 导出错误
