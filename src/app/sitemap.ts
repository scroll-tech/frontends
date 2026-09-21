import { MetadataRoute } from "next"

import { publishedPosts } from "./blog/posts"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://scroll.io", changeFrequency: "daily", priority: 0.8 },
    { url: "https://scroll.io/blog", changeFrequency: "weekly", priority: 0.7 },
    ...publishedPosts().map(post => ({
      url: `https://scroll.io/blog/${post.id}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: "https://scroll.io/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
    { url: "https://scroll.io/app-privacy-policy", changeFrequency: "yearly", priority: 0.4 },
    { url: "https://scroll.io/support", changeFrequency: "monthly", priority: 0.5 },
    { url: "https://scroll.io/terms-of-service", changeFrequency: "yearly", priority: 0.4 },
  ]
}
