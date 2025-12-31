import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const authPages = ["/login", "/signup"];
  const adminRoutes = ["/admin/:path*"];
  const staffRoutes = ["/cpanel/:path*"];

  try {
    // Call your auth API to get user info
    const res = await fetch(`${req.nextUrl.origin}/api/auth/me`, {
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      },
    });

    let user = null;
    if (res.ok) {
      const data = await res.json();
      user = data.user;
    }

    // --------- NOT LOGGED IN ----------
    if (!user) {
      if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/cpanel")) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
      return NextResponse.next(); // allow login/signup
    }

    // --------- LOGGED IN USERS ----------
    // Redirect logged-in users away from login/signup
    if (authPages.includes(url.pathname)) {
      if (user.role === "admin") {
        url.pathname = "/admin";
      } else if (user.role === "user") {
        url.pathname = "/cpanel";
      }
      return NextResponse.redirect(url);
    }

    // --------- PROTECT ROUTES BASED ON ROLE ----------
    // Admin routes
    if (url.pathname.startsWith("/admin")) {
      if (user.role !== "admin") {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // Staff routes
    if (url.pathname.startsWith("/cpanel")) {
      if (user.role !== "user") {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // All other routes
    return NextResponse.next();
  } catch (err) {
    // On error, redirect to login if trying to access protected routes
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/cpanel")) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/admin/:path*", "/cpanel/:path*", "/login", "/signup"],
};
