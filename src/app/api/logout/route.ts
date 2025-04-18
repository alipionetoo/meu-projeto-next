// src/app/api/logout/route.ts
import { NextResponse } from 'next/server';

export function GET() {
  const res = NextResponse.redirect(new URL('/', 'http://localhost:3000'));
  res.headers.set('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
  return res;
}
