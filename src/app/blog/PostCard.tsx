import Link from "next/link"

import styles from "./blog.module.css"
import { Post, formatDate, isInternalTag } from "./posts"

/**
 * One post in the list: the date and category in mono above a serif title, the poster to
 * the right (above, on phones). A hairline grows under the title on hover, the way the
 * links in the nav do.
 */
const PostCard = ({ post, className }: { post: Post; className?: string }) => (
  <Link href={`/blog/${post.id}`} className={`${styles.card} ${className ?? ""}`}>
    <div className={styles.cardInfo}>
      <p className={styles.meta}>
        {formatDate(post.date)}
        {!isInternalTag(post.type) && post.type ? ` · ${post.type}` : ""}
      </p>
      <h2 className={styles.cardTitle}>{post.title}</h2>
      {post.summary && <p className={styles.excerpt}>{post.summary}</p>}
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.thumb} src={post.posterImg} alt="" loading="lazy" />
  </Link>
)

export default PostCard
