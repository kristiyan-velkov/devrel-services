import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = "2026-11-01";
  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/why`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/conferences`, lastModified, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/plans`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/calendar`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];
}
