import { NextResponse } from 'next/server';
export const revalidate = 60;

export async function GET(request) {
  const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  const target = `${API_BASE_URL.replace(/\/$/, '')}/api/Blog`;

  const reqHeaders = request.headers;
  const xff = reqHeaders.get('x-forwarded-for') || '';
  const xri = reqHeaders.get('x-real-ip') || '';
  const ip = (xff.split(',')[0] || '').trim() || xri || '';

  const headers = new Headers();
  if (ip) {
    headers.set('CF-Connecting-IP', ip);
    headers.set('X-Forwarded-For', ip);
  }

  try {
    const res = await fetch(target, { headers, next: { revalidate } });
    const data = await res.json().catch(() => ([]));
    // 明确告知浏览器可缓存 60s，减少连续点击时的重复请求
    return new NextResponse(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': `public, max-age=${revalidate}, s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`,
      },
    });
  } catch {
    return NextResponse.json([], { status: 502, headers: { 'Cache-Control': 'public, max-age=10' } });
  }
}
