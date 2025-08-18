import React from 'react';
import ClientBlog from '@/components/blog/ClientBlog';
import '@/styles/index.css';
import { apiUrl } from '@/lib/api';

export const dynamic = 'force-dynamic'; // 统一主页动态 SSR 风格
export const metadata = {
  title: "Blogs",
  description: 'Browse latest posts from Whalefall',
  alternates: { canonical: '/blog' },
};

async function getBlogs() {
  try {
    const res = await fetch(apiUrl('Blog'), { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <ClientBlog blogs={blogs} />;
}

// 移除了内联的 `use client` 包装组件，改为从 ./ClientBlog 引入
