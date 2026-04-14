import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog/"],
        disallow: ["/api/", "/auth/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
