import React, { useRef } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import './HomePage.css';

function HomePage({ isDarkMode}) {
  return (
  <main className={`main-content ${isDarkMode ? 'dark-mode' : ''}`}>
    <section id="Start" className="intro">
      <h1 className={isDarkMode ? 'dark-mode' : ''}>欢迎来到我的个人网站</h1>
      <p>这里展示了我的个人简历、兴趣爱好以及掌握的技术。</p>
    </section>

    <section className="education">
      <h2 className={isDarkMode ? 'dark-mode' : ''}>个人学历</h2>
      <p>某某大学，计算机科学专业，学士学位。</p>
    </section>

    <section className="skills">
      <h2 className={isDarkMode ? 'dark-mode' : ''}>掌握的技术方向</h2>
      <ul>
        <li>完全同态加密</li>
        <li>密态推理模型</li>
        <li>前端开发 (React, HTML, CSS)</li>
        <li>后端开发 (Node.js, Express)</li>
        
      </ul>
    </section>

    <section className="latest-blog">
      <h2 className={isDarkMode ? 'dark-mode' : ''}>最新博客</h2>
      <article>
        <h3>标题：如何高效学习React</h3>
        <p>发布日期：2024年12月25日</p>
        <p>简要介绍：本文介绍了学习React的最佳实践...</p>
      </article>
    </section>

    <section id="Connect" className="connnect-me" >
      <h2 className={isDarkMode ? 'dark-mode' : ''}>Connect me</h2>
    </section>
  </main>
  );
}

export default HomePage;