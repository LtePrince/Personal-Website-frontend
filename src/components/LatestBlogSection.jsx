import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import ClientLatestBlogCard from './ClientLatestBlogCard';

export const revalidate = 60;

async function getLatestBlogs() {
  const base = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  const url = `${base.replace(/\/$/, '')}/api/Blog`;
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return [];
    const list = await res.json();
    const arr = Array.isArray(list) ? list : [];
    const sorted = arr.slice().sort((a, b) => (Date.parse(b?.date) || 0) - (Date.parse(a?.date) || 0));
    return sorted.slice(0, 6);
  } catch {
    return [];
  }
}

export default async function LatestBlogSection() {
  const blogs = await getLatestBlogs();
  return (
    <section className="latest-blog-section">
      <h2><FaBookOpen /> Latest Blog</h2>
      <div className="blog-list">
        {blogs.length > 0 ? (
          blogs.map((b) => <ClientLatestBlogCard key={b.id} blog={b} />)
        ) : (
          <div className="section-card">
            <p>No blog posts yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
