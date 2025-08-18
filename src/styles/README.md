# styles 目录说明

此目录正在从旧的集中式 legacy 样式向更模块化 / Tailwind 化过渡。

## 当前结构
- `components/index.css` 聚合仍需要的 legacy 组件/页面级样式 + Skeleton。
- `legacy/` 存放尚未改写的旧样式文件；逐步迁移后将删除。

## 渐进迁移计划（建议）
1. 按域拆分：为每个仍保留的复杂组件（例如 BlogSidebar、SystemOverview）创建对应的 `*.module.css` 或使用 Tailwind 实现，再从聚合文件移除其 import。
2. 验证无引用后删除 `legacy/components/<name>.css`。
3. 页面级 `pages/Blog/page.css` 与 `pages/BlogDetail/page.css` 重写为局部模块，或将样式语义化为 Tailwind 原子类。
4. 移除 `page.css` 通用残留，保留真正需要的基础样式到 `globals.css`（或在 Tailwind `@layer components` 中）。
5. 清理完成后删除 `components/index.css` 中所有 `@import`，最终只保留 Skeleton / 公共变量，或直接改为使用 Tailwind。

## 已执行清理
- 删除未使用空文件: `legacy/components/HomePage.css`。
- 移除 BlogContentSwitcher 组件后对应 import，不再聚合其 CSS；若确认不再需要可删除 `legacy/components/BlogContentSwitcher.css`。

## 待确认
- `legacy/components/BlogContentSwitcher.css` 是否保留（目前组件仍使用简单类名，如需 Tailwind 化可直接重写后删除该文件）。

## 提示
迁移某文件时的步骤：
1. 新建 `<Component>.module.css`（或直接 Tailwind）。
2. 复制仅该组件所需选择器，改为局部类名（避免全局冲突）。
3. 更新组件 import，并删去聚合 index.css 中对应 `@import`。
4. 页面检查 OK 后物理删除 legacy 文件，更新本 README。

