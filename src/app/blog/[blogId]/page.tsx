import type { Metadata, ResolvingMetadata } from "next"
import Head from "next/head"
import { headers } from "next/headers"

import blogSource from "./data.json"
import Detail from "./detail"

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { origin } = new URL(headers().get("x-url")!)
  const currentBlog = blogSource.find(blog => blog.id === params.blogId)

  const title = `${currentBlog.title} - Scroll`
  const description = currentBlog.summary
  const imgUrl = currentBlog.ogImg || currentBlog.posterImg

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      url: currentBlog.canonical || `https://scroll.io/blog/${currentBlog.id}`,
      images: [imgUrl],
    },
    twitter: {
      title,
      description,
      images: [imgUrl],
    },
    alternates: {
      canonical: currentBlog.canonical,
    },
  }
}

const BlogDetail = () => {
  return (
    <>
      <Head></Head>
      <Detail></Detail>
    </>
  )
}

export default BlogDetail
