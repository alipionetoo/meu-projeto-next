import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.nextUrl.pathname}`);

  if (req.nextUrl.pathname.startsWith('/protected')) {
    const token = req.cookies.get('token')?.value;
    if (token !== 'MEU_TOKEN_SECRETO') {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected'],
};
