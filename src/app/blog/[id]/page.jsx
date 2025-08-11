import React from 'react';
import '@/styles/components/index.css';
import ClientDetail from './ClientDetail';

export const revalidate = 300; // ISR for details

async function getPost(id) {
  const base = process.env.API_BASE_URL;
  if (!base) {
    throw new Error('Missing API_BASE_URL environment variable');
  }
  const url = `${base}/BlogDetail?id=${encodeURIComponent(id)}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch blog detail');
  return res.json();
}

export async function generateMetadata({ params }) {
  const { id } = await params; // await params per Next.js 15 dynamic API
  try {
    const data = await getPost(id);
    return {
      title: data?.title ? `${data.title} | Adolph's Blog` : "Adolph's Blog",
      description: data?.summary || '',
      alternates: { canonical: `/blog/${id}` },
      openGraph: {
        title: data?.title || "Adolph's Blog",
        description: data?.summary || '',
        url: `/blog/${id}`,
        type: 'article',
      },
    };
  } catch {
    return { title: "Adolph's Blog" };
  }
}

export default async function BlogDetail({ params }) {
  const { id } = await params; // await params per Next.js 15 dynamic API
  let data = null;
  try {
    data = await getPost(id);
  } catch (e) {
    data = { text: '' };
  }

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
