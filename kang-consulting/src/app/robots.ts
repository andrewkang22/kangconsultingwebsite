import type { MetadataRoute } from "next";
import { SITE_DOWN } from "@/lib/siteStatus";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kangconsulting.org";

export default function robots(): MetadataRoute.Robots {
  if (SITE_DOWN) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/branding/", "/hero.mp4", "/hero-bg-640.mp4"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
