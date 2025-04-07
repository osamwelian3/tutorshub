import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Define which paths should be protected
    if (pathname.startsWith('/dashboard')) {
      const token = request.cookies.get('session_key'); // Check if the user has a valid token
      // If no token is found, redirect to login
      if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    // Allow the request to continue if authenticated
    return NextResponse.next();
  }