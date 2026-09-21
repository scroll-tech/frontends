import Link from "next/link"

import styles from "../../blog.module.css"

const BackLink = ({ className }: { className?: string }) => (
  <Link href="/blog" className={`${styles.back} ${className ?? ""}`}>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13 5 8l5-5" />
    </svg>
    All posts
  </Link>
)

export default BackLink
