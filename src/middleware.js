import { NextResponse } from "next/server";

function getUserRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return (
      payload.role ||
      payload.roles?.[0] ||
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      null
    );
  } catch {
    return null;
  }
}

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const protectedPaths = ["/dashboard", "/my-courses", "/progress"];
  const roleRoutes = {
    "/my-courses": ["Instructor", "Admin"],
    "/admin": ["Admin"],
  };

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    const userRole = getUserRoleFromToken(token);

    if (!userRole) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    for (const route in roleRoutes) {
      if (pathname.startsWith(route)) {
        const allowedRoles = roleRoutes[route];

        if (!allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
    }
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
    "/admin/:path*",
  ],
};
