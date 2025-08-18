import React from 'react';
import LatestBlogSection from '@/components/home/LatestBlogSection';
import HomeClientShell from '@/components/home/HomeClientShell';
import { apiUrl } from '@/lib/api';

export const dynamic = 'force-dynamic'; // SSR no-store 效果

async function getLatestBlogs() {
  try {
    const res = await fetch(apiUrl('Blog'), { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    const arr = Array.isArray(data) ? data : [];
    return arr
      .slice()
      .sort((a, b) => (Date.parse(b?.date) || 0) - (Date.parse(a?.date) || 0))
      .slice(0, 6);
  } catch {
    return [];
  }
}

export default async function Home() {
  const blogs = await getLatestBlogs(); // SSR 获取，后端挂则为空数组
  return (
    <HomeClientShell blogs={blogs} />
  );
}
