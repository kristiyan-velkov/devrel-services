import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl(), lastModified: "2026-11-01", changeFrequency: "monthly", priority: 1 }];
}
