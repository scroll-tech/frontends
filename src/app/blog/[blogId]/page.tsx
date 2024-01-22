import type { Metadata } from "next"
import { headers } from "next/headers"

import blogSource from "./data.json"
import Detail from "./detail"

export async function generateMetadata({ params }): Promise<Metadata> {
  const { origin } = new URL(headers().get("x-url")!)
  const currentBlog = blogSource.find(blog => blog.id === params.blogId)

  const title = `${currentBlog?.title} - Scroll`
  const description = currentBlog?.summary
  const imgUrl = currentBlog?.ogImg || currentBlog?.posterImg || ""
  const url = currentBlog?.canonical || `https://scroll.io/blog/${currentBlog?.id}`

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [imgUrl],
    },
    twitter: {
      title,
      description,
      images: [imgUrl],
    },
    alternates: {
      canonical: currentBlog?.canonical,
    },
  }
}

const BlogDetail = () => {
  return <Detail></Detail>
}

export default BlogDetail
