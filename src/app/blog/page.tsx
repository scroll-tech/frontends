import PostList from "./PostList"
import styles from "./blog.module.css"
import { publishedPosts, usedCategories } from "./posts"

// the order the blog has always listed its categories in (src/constants/blog.ts)
const CATEGORY_ORDER = ["Announcement", "General", "Technical", "Ecosystem highlights"]

const Blog = async ({ searchParams }) => {
  const { category } = await searchParams
  const posts = publishedPosts()
  const initialCategory = Array.isArray(category) ? category[0] : category

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.lede}>Announcements, technical write-ups and ecosystem news from the Scroll team.</p>
      </header>
      <PostList posts={posts} categories={usedCategories(posts, CATEGORY_ORDER)} initialCategory={initialCategory ?? "All"} />
    </div>
  )
}

export default Blog
