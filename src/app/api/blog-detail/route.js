import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const target = `${API_BASE_URL.replace(/\/$/, '')}/api/BlogDetail?id=${encodeURIComponent(id)}`;

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
    const res = await fetch(target, { headers, cache: 'no-store' });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
  }
}
