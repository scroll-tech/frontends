"use client"

import type { FC } from "react"
import { useEffect, useState } from "react"

import styles from "../../blog.module.css"

interface Heading {
  text: string
  slug: string
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

/**
 * The post is markdown rendered on the server, so its headings carry no ids of their own:
 * this walks the article's h2s once it is mounted, gives each one an id and lists them.
 * The entry for the heading nearest the top of the viewport is the lit one.
 */
const TableOfContents: FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [currentID, setCurrentID] = useState("")

  useEffect(() => {
    const found = [...document.querySelectorAll<HTMLHeadingElement>("article h2")]
    const seen = new Map<string, number>()
    const list = found.map(heading => {
      const text = heading.textContent ?? ""
      const base = slugify(text) || "section"
      const count = (seen.get(base) ?? 0) + 1
      seen.set(base, count)
      const slug = count > 1 ? `${base}-${count}` : base
      heading.id = slug
      return { text, slug }
    })
    setHeadings(list)

    if (!list.length) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrentID(entry.target.id)
            break
          }
        }
      },
      // a heading counts as "current" once it is in the top third of the viewport
      { rootMargin: "-100px 0px -66% 0px" },
    )
    found.forEach(heading => observer.observe(heading))

    const hash = decodeURIComponent(window.location.hash.replace("#", ""))
    if (hash) document.getElementById(hash)?.scrollIntoView()

    return () => observer.disconnect()
  }, [])

  if (!headings.length) return null

  return (
    <>
      <p className={styles.tocLabel}>On this page</p>
      <ul className={styles.tocList}>
        {headings.map(heading => (
          <li key={heading.slug} className={currentID === heading.slug ? styles.tocActive : ""}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TableOfContents
