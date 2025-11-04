// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (!token) {
    if (
      pathname.startsWith("/analyze") ||
      pathname.startsWith("/history") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/pricing")
    ) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  } else {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/analyze", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/analyze/:path*", "/history/:path*", "/profile/:path*", "/pricing/:path*"],
};
