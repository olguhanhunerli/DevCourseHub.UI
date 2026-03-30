import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = new URL(request.url);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const protectedPaths = ["/dashboard", "/my-courses", "/progress"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/my-courses/:path*",
    "/progress/:path*",
  ],
};
