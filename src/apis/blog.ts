export const blogOrigin = "https://ghost-relay.vercel.app/"

export const fetchBlogDetailURL = (blogId: string) => `${blogOrigin}/api/post/${blogId}.md?title=1`
