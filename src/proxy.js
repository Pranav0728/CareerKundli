// src/proxy.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // -------------------------------
  // 1️⃣ If user is NOT logged in
  // -------------------------------
  if (!token) {
    // Protect private routes
    if (
      pathname.startsWith("/analyze") ||
      pathname.startsWith("/history") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/pricing")
    ) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // -------------------------------
  // 2️⃣ If user IS logged in
  // -------------------------------
  else {
    // Prevent access to public routes (like '/')
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/analyze", req.url));
      // or redirect to "/profile", depending on your app flow
    }
  }

  // -------------------------------
  // 3️⃣ Allow normal request
  // -------------------------------
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/analyze/:path*", "/history/:path*", "/profile/:path*", "/pricing/:path*"],
};
