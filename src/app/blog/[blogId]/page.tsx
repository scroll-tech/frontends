import type { Metadata } from "next"
import Head from "next/head"
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
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
          integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"
          crossOrigin="anonymous"
        />
      </Head>
      <Detail></Detail>
    </>
  )
}

export default BlogDetail
