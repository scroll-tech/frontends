"use server"

import { fetchBlogDetailURL } from "@/apis/blog"

export const fetchBlogContent = async (blogId: string) => {
  const response = await fetch(fetchBlogDetailURL(blogId))

  if (response.ok) {
    const blogContent = await response.text()
    if (!blogContent) {
      throw new Error("Not found")
    }
    return blogContent
  } else {
    throw new Error("Failed to fetch blog content")
  }
}
