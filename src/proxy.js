import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = new URL(req.url);
  const pathname = url.pathname; // ✅ safe

  const protectedRoutes = ["/analyze", "/history", "/profile", "/pricing"];

  // redirect unauthenticated users
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // redirect logged-in users visiting "/"
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/analyze", req.url));
  }

  return NextResponse.next();
}
