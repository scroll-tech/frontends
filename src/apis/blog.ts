export const blogOrigin = "https://blog.scroll.cat"

// ?title=1  with title
export const fetchBlogDetailURL = (blogId: string) => `${blogOrigin}/api/post/${blogId}.md`
