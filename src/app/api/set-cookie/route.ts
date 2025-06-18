import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { name, value } = await request.json();
  const cookiesStore = await cookies();

  cookiesStore.set(name, value, {
    httpOnly: false, 
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
  });

  return NextResponse.json({ message: 'Cookie setado com sucesso' });
}