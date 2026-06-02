import type { MetadataRoute } from "next";
import { SITE_DOWN } from "@/lib/siteStatus";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kangconsulting.org";

const sections = ["", "/about", "/services", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  if (SITE_DOWN) {
    return [
      {
        url: siteUrl,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.1,
      },
    ];
  }

  return sections.map((section, index) => {
    const suffix = section === "" ? "" : section;
    return {
      url: `${siteUrl}${suffix}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: index === 0 ? 1 : 0.7,
    };
  });
}
