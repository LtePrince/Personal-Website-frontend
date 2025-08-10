/** @type {import('next').NextConfig} */
const nextConfig = {
  // 生成唯一的构建ID，确保每次构建都有不同的文件名
  generateBuildId: async () => {
    return `build-${new Date().getTime()}`
  },
  
  // 配置资源缓存策略
  assetPrefix: '',
  
  // 配置响应头，控制缓存
  async headers() {
    return [
      {
        // 匹配所有 JS 和 CSS 文件
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1年缓存，但文件名变化时会自动更新
          },
        ],
      },
      {
        // HTML 文件不缓存，确保每次都检查最新版本
        source: '/(.*).html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },

  // 在开发环境中，将 `/api/*` 代理到本地后端
  // 在生产/预发布环境中，不进行重写，以便 Nginx 继续处理 `/api/*`
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      const target = process.env.API_BASE_URL || 'http://localhost:8080/api';
      return [
        { source: '/api/:path*', destination: `${target}/:path*` },
      ];
    }
    return [];
  },
};

export default nextConfig;
