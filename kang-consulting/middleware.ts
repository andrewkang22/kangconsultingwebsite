import { NextResponse, type NextRequest } from "next/server";
import { SITE_DOWN } from "@/lib/siteStatus";

const PUBLIC_FILE_PATTERN = /\.[^/]+$/;

const shouldBypassMaintenance = (pathname: string) =>
  pathname === "/down" ||
  pathname === "/robots.txt" ||
  pathname === "/sitemap.xml" ||
  pathname.startsWith("/_next") ||
  pathname.startsWith("/api") ||
  PUBLIC_FILE_PATTERN.test(pathname);

export function middleware(request: NextRequest) {
  if (!SITE_DOWN || shouldBypassMaintenance(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = "/down";

  const response = NextResponse.rewrite(maintenanceUrl, {
    status: 503,
    headers: {
      "Retry-After": "86400",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
