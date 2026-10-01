import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { services } from "@/lib/services";

/** Every public page. /brand is an internal reference and stays out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/solutions", "/results", "/contact", ...services.map((s) => `/solutions/${s.id}`)];
  return pages.map((path) => ({
    url: `${brand.url}${path}`,
    lastModified: new Date(),
    priority: path === "" ? 1 : 0.7,
  }));
}
