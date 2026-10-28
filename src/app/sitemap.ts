import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { allRoutes } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allRoutes().map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products/film-faced-plywood") ? 0.9 : path.split("/").length <= 3 ? 0.8 : 0.6,
  }));
}
