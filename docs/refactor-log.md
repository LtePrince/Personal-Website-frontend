# Personal Website 重构对话与流程文档

更新时间：2025-08-11  
参与者：你 与 GitHub Copilot

## 1. 目标与约束
- 目标
  - 保持现有页面视觉不变
  - 提升架构（App Router、服务端数据、SEO、Markdown 安全）
  - 分离本地开发与远程环境，不改动既有 Nginx
  - 为未来博客管理与扩展铺路
- 约束
  - 不引入与 React 19 冲突的依赖
  - 不将服务器函数传入客户端组件
  - 消除 hydration 报错
  - 静态资源移动到 public 下并走根路径引用

## 2. 架构与目录调整
- 统一到 App Router（`src/app`），迁移/整理组件到 `src/components`
- 清理 `app_back` 遗留，保留旧样式到 `src/styles/legacy`，集中导入 `src/styles/components/index.css`
- 静态资源移动到 `public/images`，CSS 与组件统一根路径引用（如 `/images/background.jpg`）

## 3. 数据与接口
- 列表与详情页使用服务端请求 + ISR
  - `export const revalidate = 300`
  - 列表路由：`src/app/blog/page.jsx`（服务端）+ `src/app/blog/ClientBlog.jsx`（客户端包装）
  - 详情路由：`src/app/blog/[id]/page.jsx`（服务端）+ `src/app/blog/[id]/ClientDetail.jsx`（客户端视图）
- 开发环境下通过 Next 重写代理 `/api/*` 到后端；生产与测试仍由 Nginx 处理

## 4. Markdown 渲染与安全
- 组件：`src/components/Markdown.jsx`
- 技术栈：`react-markdown` + `remark-gfm` + `rehype-sanitize`
- 样式：在 `src/styles/legacy/pages/BlogDetail/page.css` 增加暗色模式下的文字、链接、代码、blockquote 等覆盖

## 5. 评论（Giscus）
- 组件：`src/components/Comments.jsx`（客户端）
- 传参：通过 `theme` 属性动态切换 `light/dark`
- 样式容器：`giscus-container` 与 `.dark-mode` 同步背景与光晕效果

## 6. 主题（亮/暗）
- 因 `next-themes` 与 React 19 peer 冲突，移除该依赖
- 改为客户端本地状态 + localStorage 存储 `isDarkMode`
- Navbar 支持受控/非受控两种模式，避免 hydration 差异
- 详情页容器 `.app-container .blog-detail-container .blog-detail-content` 与 `giscus-container` 在暗色模式下叠加样式

## 7. SEO 与元信息
- 使用 App Router Metadata API 配置站点与页面元信息
- 详情页服务端插入 Article JSON-LD（结构化数据）
- 预留 robots/sitemap，后续可生成动态 sitemap

## 8. 关键问题与修复
- 安装失败：`next-themes` 与 React 19 peer 冲突
  - 处理：移除 `next-themes`，保留本地主题切换逻辑，依赖安装恢复正常
- Hydration 报错
  - Navbar 开关由 button/aria 切换为统一结构，避免 SSR/CSR 差异
  - 不从服务端组件传函数到客户端组件
  - 把 `'use client'` 指令移到文件顶层，并将客户端逻辑拆到独立文件
- 编译错误：`'use client'` 位于文件中间
  - 处理：拆分客户端包装组件（如 `ClientBlog.jsx`、`[id]/ClientDetail.jsx`）
- 动态路由参数报错（Next 15）
  - 报错：Route "/blog/[id]" used `params.id`. `params` should be awaited...
  - 修复：在 `src/app/blog/[id]/page.jsx` 的 `generateMetadata` 与默认导出组件中使用 `const { id } = await params;`
- DeprecationWarning: util._extend
  - 来源：某依赖使用旧 API；与业务代码无关。可忽略或用 `--trace-deprecation` 定位；升级依赖/Node 可消除

## 9. 博客详情页 UI 调整
- 返回箭头
  - 恢复为图标按钮样式，颜色暗色 `#f5d46f`/亮色 `#333`
  - 使用 `react-icons/fa6` 的 `FaArrowLeft`（更粗更圆润）
  - 点击跳转 `/blog`（新路由）
- Markdown 与 Giscus 暗色
  - 按 `isDarkMode` 传入 `<Comments theme={...} />`
  - 在 `BlogDetail/page.css` 中新增 `.dark-mode .markdown-body` 系列覆盖

## 10. 涉及的核心文件
- 路由与页面
  - `src/app/layout.js`：移除主题 Provider，保留元信息与全局样式
  - `src/app/page.jsx`：首页（客户端），使用本地主题，引用聚合 CSS
  - `src/app/blog/page.jsx`：博客列表（服务端）+ `src/app/blog/ClientBlog.jsx`（客户端包装）
  - `src/app/blog/[id]/page.jsx`：详情页（服务端，await params，插入 JSON-LD）
  - `src/app/blog/[id]/ClientDetail.jsx`：详情页视图（客户端，本地主题/Giscus/Markdown/返回箭头）
- 组件
  - `src/components/Navbar.jsx`：Apple 风格主题开关，SSR/CSR 一致
  - `src/components/BlogList.jsx`、`BlogSidebar.jsx`、`BlogContentSwitcher.jsx`、`SearchBar.jsx`、`HomePage.jsx`
  - `src/components/Markdown.jsx`：安全 Markdown 渲染
  - `src/components/Comments.jsx`：Giscus 包装
- 样式与资源
  - `src/styles/components/index.css`：聚合 legacy 样式并统一背景图路径
  - `src/styles/legacy/**/*`：保留历史外观
  - `src/styles/legacy/pages/BlogDetail/page.css`：新增暗色覆盖规则
  - `public/images/*`：统一资源路径（Navbar 与 CSS 使用根路径）
- 配置
  - `next.config.mjs`：开发环境 `/api` 重写到后端（生产由 Nginx 代理）
  - `package.json`：移除 `next-themes`；保留 `@giscus/react`、`react-markdown`、`remark-gfm`、`rehype-sanitize`、`react-icons`
  - `jsconfig.json`：`baseUrl` 与 `paths` 修正

## 11. 本次显式错误与信息
- 动态路由 params 报错（已修复）
  - 错误：Route "/blog/[id]" used `params.id`. `params` should be awaited...
  - 位置：`src/app/blog/[id]/page.jsx`（已改为 `const { id } = await params;`）
- DeprecationWarning
  - `(node:xxxx) [DEP0060] DeprecationWarning: The util._extend API is deprecated. Please use Object.assign() instead.`

## 12. 已完成与待办
- 已完成
  - App Router 规范化、服务端数据 + ISR
  - 开发/生产环境隔离（不改 Nginx）
  - Markdown 安全渲染、SEO 基础与 JSON-LD
  - 清理旧 JSX、聚合样式、统一资源路径
  - 解决安装冲突、hydration 与边界传参问题
  - 详情页暗色样式、Giscus 主题联动、返回箭头恢复为更粗圆风格
- 可选待办
  - 动态 sitemap、路由级 loading/error
  - 文章级 OG 图生成
  - 将返回动作改用 `router.push('/blog')` 实现无刷新跳转

## 13. 使用与验证建议
- 本地开发：启用 Next dev，验证 `/blog` 与 `/blog/[id]` 在亮/暗模式下 Markdown 与 Giscus 同步切换
- 生产：继续由 Nginx 代理 `/api`，前端仅请求相对路径 `/api/*`
- 若需要中文评论 UI：在 `src/components/Comments.jsx` 将 `lang` 改为 `zh-CN`

---

如需追加截图或进一步记录，请在本文件下继续扩充。
