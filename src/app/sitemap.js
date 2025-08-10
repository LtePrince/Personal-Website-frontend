export default async function sitemap() {
  // Minimal sitemap; extend by querying your backend for all blog IDs
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  // TODO: fetch ids and map to /blog/[id]
  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/lab`, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
