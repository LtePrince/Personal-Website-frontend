// API 基础工具: NEXT_PUBLIC_API_BASE_URL 需包含 /api 前缀 (例如 http://localhost:8080/api)
export function apiBase() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  return raw.replace(/\/$/, '');
}
export function apiUrl(path = '') {
  const base = apiBase();
  const clean = String(path || '').replace(/^\//, '');
  return clean ? `${base}/${clean}` : base;
}
