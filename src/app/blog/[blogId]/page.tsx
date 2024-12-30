import blogSource from "@/assets/blog/main.data.json"
import { genMeta } from "@/utils/route"

import Detail from "./detail"

export const generateMetadata = genMeta(({ params }) => {
  const currentBlog = blogSource.find(blog => blog.id === params.blogId)
  const imgUrl = currentBlog?.ogImg || currentBlog?.posterImg || ""

  return {
    titleSuffix: currentBlog?.title,
    relativeURL: currentBlog?.canonical || `https://scroll.io/blog/${currentBlog?.id}`,
    description: currentBlog?.summary,
    ogImg: imgUrl,
    twitterImg: imgUrl,
    alternates: {
      canonical: currentBlog?.canonical,
    },
  }
})

const BlogDetail = () => {
  return (
    <>
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
      <Detail></Detail>
    </>
  )
}

export default BlogDetail
