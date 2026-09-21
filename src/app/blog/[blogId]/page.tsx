import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { fetchBlogDetailURL } from "@/apis/blog"
import { isSepolia } from "@/utils/common"
import { genMeta } from "@/utils/route"

import PostCard from "../PostCard"
import styles from "../blog.module.css"
import { findPost, formatDate, isInternalTag, publishedPosts } from "../posts"
import BackLink from "./components/BackLink"
import TOC from "./components/tableOfContents"

export const generateMetadata = genMeta(async ({ params }) => {
  const { blogId } = await params
  const currentBlog = findPost(blogId?.toLowerCase())
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

/**
 * The post itself is markdown served by the blog host (its first line is the title —
 * `?title=1`). It used to be fetched in the browser behind a spinner; fetching it here puts
 * the article in the HTML, so it is there for search engines and on the first paint. The
 * hour's revalidation is what keeps an edit on the blog reaching the page.
 */
const fetchBlogContent = async (blogId: string) => {
  const response = await fetch(fetchBlogDetailURL(blogId), { next: { revalidate: 3600 } })
  if (!response.ok) return null
  const content = await response.text()
  return content || null
}

const BlogDetail = async ({ params }) => {
  if (isSepolia) {
    notFound()
  }
  const { blogId } = await params
  const id = blogId?.toLowerCase()
  const content = await fetchBlogContent(id)

  if (!content) {
    notFound()
  }

  const post = findPost(id)
  const morePosts = publishedPosts()
    .filter(other => other.id !== id)
    .slice(0, 3)

  return (
    <div className={styles.pageWide}>
      {/* the maths in the technical posts */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
        integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
        crossOrigin="anonymous"
      />
      <div className={styles.articlePage}>
        <aside className={styles.rail}>
          <div className={styles.toc}>
            <BackLink />
            <TOC />
          </div>
        </aside>
        <article className={styles.article}>
          <BackLink className={styles.backMobile} />
          {!!post && (
            <p className={styles.articleMeta}>
              {formatDate(post.date)}
              {!isInternalTag(post.type) && post.type ? ` · ${post.type}` : ""}
            </p>
          )}
          <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex, rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </article>
        <div className={styles.rail} aria-hidden="true" />
      </div>

      {!!morePosts.length && (
        <section className={styles.more}>
          <h2 className={styles.moreTitle}>More from Scroll</h2>
          <ul className={styles.moreGrid}>
            {morePosts.map(other => (
              <li key={other.id}>
                <PostCard post={other} className={styles.moreCard} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default BlogDetail
