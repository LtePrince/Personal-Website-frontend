import React from 'react';
import './HomePage.css';

function HomePage({ isDarkMode }) {
  return (
    <main className={`main-content ${isDarkMode ? 'dark-mode' : ''}`}>
      <section id="Start" className="intro">
        <h1 className={isDarkMode ? 'dark-mode' : ''}>Welcome to Adoph's Blog</h1>
        <p>This site showcases my resume, interests, and skills.</p>
      </section>

      <section className="education">
        <h2 className={isDarkMode ? 'dark-mode' : ''}>Education</h2>
        <p>XYZ University, Bachelor of Science in Computer Science.</p>
      </section>

      <section className="skills">
        <h2 className={isDarkMode ? 'dark-mode' : ''}>Skills</h2>
        <ul>
          <li>Fully Homomorphic Encryption</li>
          <li>Encrypted Inference Models</li>
          <li>Frontend Development (React, HTML, CSS)</li>
          <li>Backend Development (Node.js, Express)</li>
        </ul>
      </section>

      <section className="latest-blog">
        <h2 className={isDarkMode ? 'dark-mode' : ''}>Latest Blog</h2>
        <article>
          <h3>Title: How to Efficiently Learn React</h3>
          <p>Published on: December 25, 2024</p>
          <p>Summary: This article introduces the best practices for learning React...</p>
        </article>
      </section>

      <section id="Connect" className="connect-me">
        <h2 className={isDarkMode ? 'dark-mode' : ''}>Connect with Me</h2>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
      </section>
    </main>
  );
}

export default HomePage;