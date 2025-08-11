import React from 'react';
import HomeClientShell from '@/components/HomeClientShell';
import LatestBlogSection from '@/components/LatestBlogSection';

export default function Home() {
  const serverLatestBlogSlot = <LatestBlogSection />;
  return <HomeClientShell serverLatestBlogSlot={serverLatestBlogSlot} />;
}
