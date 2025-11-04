import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req?.nextUrl?.pathname || "/";

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/analyze", req.url));
  }

  // Allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/analyze/:path*", "/history/:path*", "/profile/:path*", "/pricing/:path*"],
};
