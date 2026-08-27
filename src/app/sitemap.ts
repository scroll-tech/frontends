import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://scroll.io", changeFrequency: "daily", priority: 0.8 },
    { url: "https://scroll.io/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
    { url: "https://scroll.io/app-privacy-policy", changeFrequency: "yearly", priority: 0.4 },
    { url: "https://scroll.io/terms-of-service", changeFrequency: "yearly", priority: 0.4 },
  ]
}
