"use client"

import { useState } from "react"

import PostCard from "./PostCard"
import styles from "./blog.module.css"
import { Post } from "./posts"

interface PostListProps {
  posts: Post[]
  categories: string[]
  /** /blog?category=… — the ecosystem page has always linked straight to a category */
  initialCategory: string
}

const ALL = "All"

const PostList = ({ posts, categories, initialCategory }: PostListProps) => {
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : ALL)
  const shown = category === ALL ? posts : posts.filter(post => post.type === category)

  return (
    <>
      <div className={styles.filters}>
        {[ALL, ...categories].map(item => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`${styles.filter} ${item === category ? styles.filterActive : ""}`}
          >
            {item}
          </button>
        ))}
      </div>
      {shown.length ? (
        <ul className={styles.list}>
          {shown.map(post => (
            <li key={post.id} className={styles.row}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No posts in this category yet.</p>
      )}
    </>
  )
}

export default PostList
