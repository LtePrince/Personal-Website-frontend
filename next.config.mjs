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

  // 不再使用 Next 重写代理，所有后端访问统一用 API_BASE_URL
};

export default nextConfig;
