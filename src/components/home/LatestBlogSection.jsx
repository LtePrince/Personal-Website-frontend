// Server Component: 接收 SSR 获取的 blogs
import ClientLatestBlogCard from '@/components/home/ClientLatestBlogCard';
import BlogSkeleton from '@/components/shared/Skeleton';
import { FaBookOpen } from 'react-icons/fa';

export default function LatestBlogSection({ blogs = [] }) {
  const has = blogs && blogs.length > 0;
  return (
    <section className="latest-blog-section">
      <h2><FaBookOpen /> Latest Blog</h2>
        {has ? (<div className="blog-list">
          {blogs.map(b => <ClientLatestBlogCard key={b.id} blog={b} />)}
        </div>
        ) : (
          <div className="blog-list skeleton-wrapper" aria-label="loading latest blogs" role="status">
            {Array.from({ length: 4 }).map((_,i) => <BlogSkeleton key={i} variant="card" />)}
          </div>
        )}
      
    </section>
  );
}
