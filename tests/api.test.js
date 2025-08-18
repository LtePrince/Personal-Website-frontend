import { describe, it, expect } from 'vitest';
import { apiUrl } from '@/lib/api';

describe('apiUrl', () => {
  it('joins path correctly', () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:8080/api';
    expect(apiUrl('Blog')).toBe('http://localhost:8080/api/Blog');
  });
  it('trims slashes', () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://x/api/';
    expect(apiUrl('/weather')).toBe('http://x/api/weather');
  });
});
