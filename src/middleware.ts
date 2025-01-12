
import { NextResponse } from 'next/server';


export async function middleware(): Promise<NextResponse> {
  const res = NextResponse.next();
  return res;
}

export const config = {
  matcher: '/:path*',
}; 