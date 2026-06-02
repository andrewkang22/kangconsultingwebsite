import { NextRequest, NextResponse } from "next/server";

const allowedBotAgents = [
  /googlebot/i,
  /bingbot/i,
  /linkedinbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
];

const blockedSignatures = [
  /curl/i,
  /wget/i,
  /python-requests/i,
  /scrapy/i,
  /httpclient/i,
  /libwww-perl/i,
  /Go-http-client/i,
  /okhttp/i,
  /axios/i,
  /postmanruntime/i,
];

function isDisallowedScraper(userAgent: string | null): boolean {
  if (!userAgent) {
    return true;
  }

  const normalized = userAgent.trim();
  if (!normalized) {
    return true;
  }

  if (allowedBotAgents.some((regex) => regex.test(normalized))) {
    return false;
  }

  return blockedSignatures.some((regex) => regex.test(normalized));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public files and Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/branding") ||
    pathname.startsWith("/hero.mp4")
  ) {
    return NextResponse.next();
  }

  if (isDisallowedScraper(request.headers.get("user-agent"))) {
    return new NextResponse("Automated access is not allowed.", {
      status: 403,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all paths except for those with a file extension or next internal
    "/((?!_next|.*\\..*).*)",
  ],
};
