import React from 'react';
import ClientBlog from './ClientBlog';
import '@/styles/components/index.css';

export const revalidate = 60; // ISR for list page
export const metadata = {
  title: "Blogs",
  description: 'Browse latest posts from Whalefall',
  alternates: { canonical: '/blog' },
};

async function getBlogs() {
  const base = process.env.API_BASE_URL;
  if (!base) {
    throw new Error('Missing API_BASE_URL environment variable');
  }
  const url = `${base}/Blog`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export default async function BlogPage() {
  let blogs = [];
  try {
    blogs = await getBlogs();
  } catch (e) {
    blogs = [];
  }

  return (
    <ClientBlog blogs={blogs} />
  );
}

// 移除了内联的 `use client` 包装组件，改为从 ./ClientBlog 引入
