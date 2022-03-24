import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // Token will exist if user logged in
  const token = await getToken({
    // @ts-ignore
    req: req,
    secret: process.env.JWT_SECRET
  });

  const {pathname} = req.nextUrl;

  console.log(pathname)

  // Allow the requests if the following is true
  // 1. The token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect to login page if no token

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }


}
