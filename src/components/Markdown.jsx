'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

/**
 * Safe Markdown renderer.
 * - Uses GFM features
 * - Sanitizes HTML by default to mitigate XSS
 * Extend with rehype-highlight for code syntax highlighting later if needed.
 */
export default function Markdown({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
      {children}
    </ReactMarkdown>
  );
}
