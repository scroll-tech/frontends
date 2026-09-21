import blogSource from "@/assets/blog/main.data.json"

export type Post = {
  id: string
  title: string
  summary: string
  date: string
  type: string
  posterImg: string
  ogImg?: string | null
  canonical?: string | null
  language?: string
}

const source = blogSource as unknown as Post[]

/**
 * A handful of posts carry an internal Ghost tag as their primary tag (#natalia,
 * #shambhavi — the editor's own), which is not a category anyone should see. They stay in
 * the list; only the label goes.
 */
export const isInternalTag = (type?: string) => !!type?.startsWith("#")

/** every English post, newest first */
export const publishedPosts = (): Post[] => source.filter(post => post.language === "en").sort((a, b) => (a.date < b.date ? 1 : -1))

export const findPost = (id: string): Post | undefined => source.find(post => post.id === id)

/** the categories that actually have posts, in the order the blog has always listed them */
export const usedCategories = (posts: Post[], order: string[]): string[] => {
  const present = new Set(posts.map(post => post.type).filter(type => !isInternalTag(type)))
  return order.filter(category => present.has(category))
}

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })

export const formatDate = (date: string) => (date ? dateFormat.format(new Date(`${date}T00:00:00Z`)) : "")
