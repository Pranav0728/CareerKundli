import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import nextAuthMiddleware from "next-auth/middleware";

export async function middleware(req) {
  // Run NextAuth's built-in protection first
  const response = await nextAuthMiddleware(req);

  // Check if user has a valid token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req?.nextUrl?.pathname || "/";

  // If logged in and visiting "/", redirect to /analyze
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/analyze", req.url));
  }

  // Otherwise, continue with normal flow
  return response;
}

export const config = {
  matcher: [
    "/", // include root so redirect works
    "/analyze/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/pricing/:path*",
  ],
};
