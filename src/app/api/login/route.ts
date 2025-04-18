import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRandomUsers } from '../../../lib/users';

export async function POST(req: NextRequest) {
  const { user, pass } = await req.json();

  const users = await getRandomUsers();
  const match = users.find(u => u.username === user && u.password === pass);

  if (match) {
    const res = NextResponse.json({ success: true });
    res.headers.set(
      'Set-Cookie',
      `token=MEU_TOKEN_SECRETO; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`
    );
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
