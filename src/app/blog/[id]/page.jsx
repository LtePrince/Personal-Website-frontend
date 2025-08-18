import React from 'react';
import '@/styles/index.css';
import ClientDetail from '@/components/blogDetail/ClientDetail';
import { apiUrl } from '@/lib/api';

export const dynamic = 'force-dynamic'; // 与主页及列表页统一动态 SSR 策略

async function getPost(id) {
  try {
    // 后端真实端点为 /api/BlogDetail?id=xxx （大小写敏感），统一使用 apiUrl 构造
    const res = await fetch(apiUrl(`BlogDetail?id=${encodeURIComponent(id)}`), { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === 'object' ? data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params; // await params per Next.js 15 dynamic API
  const data = await getPost(id);
  if (!data) return { title: "Whalefall's Blog" };
  return {
    title: data?.title ? `${data.title} | Whalefall's Blog` : "Whalefall's Blog",
    description: data?.summary || '',
    alternates: { canonical: `/blog/${id}` },
    openGraph: {
      title: data?.title || "Whalefall's Blog",
      description: data?.summary || '',
      url: `/blog/${id}`,
      type: 'article',
    },
  };
}

export default async function BlogDetail({ params }) {
  const { id } = await params; // Next.js 15 dynamic params
  const data = await getPost(id) || { text: '' };

  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data?.title || 'Article',
    description: data?.summary || '',
    datePublished: data?.date || undefined,
    author: data?.author ? [{ '@type': 'Person', name: data.author }] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${base}/blog/${id}`,
    },
  };

  return (
    <>
      <ClientDetail id={id} data={data} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
