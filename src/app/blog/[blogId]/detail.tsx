"use client"

import { shuffle } from "lodash"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import blogSource from "@/assets/blog/main.data.json"
import LoadingPage from "@/components/LoadingPage"
import { LANGUAGE_MAP } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import useUserLanguage from "@/hooks/useUserLanguage"
import { filterBlogsByLanguage } from "@/utils"

import MoreBlogs from "./MoreBlogs"
import { fetchBlogContent } from "./actions"
import TOC from "./components/tableOfContents"

const BlogContainer = styled(Box)(
  ({ theme }) => `
    max-width: 140rem;
    padding: 6rem 4rem 14rem;
    overflow: visible;
    display: flex;
    width: 100%;
    margin: auto;
  ${theme.breakpoints.down("md")} {
    padding: 6.5rem 2rem 12rem;
    display: block;
    overflow: hidden;
  };
  `,
) as typeof Box

const BlogNavbar = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: "14rem",
  maxWidth: "32vw",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
})) as typeof Box

const BlogDetail = props => {
  const { blogId, title, date, type } = props
  const router = useRouter()

  const [language] = useUserLanguage()
  const [blogContent, setBlogContent] = useState<null | string>(null)
  const [moreBlog, setMoreBlog] = useState<any>([])

  const [loading, setLoading] = useState(true)

  const blogsWithLang = useMemo(() => filterBlogsByLanguage(blogSource, language), [blogSource, language])

  useEffect(() => {
    // TODO: no _lang_ in blogId
    async function fetchCurrentBlog() {
      const regex = /([^_]*?)_lang_[^_]+/g
      const blogIdMatch = blogId?.match(regex)

      const blogItemWithLang = blogSource.find(item => item.id === `${blogId}_lang_${language}`)

      if ((!blogIdMatch && language === "en") || (blogIdMatch && language !== "en") || (!blogIdMatch && language !== "en" && !blogItemWithLang)) {
        let anchors = [...document.querySelectorAll("a")]
        anchors.map(anchor => {
          if (anchor.href.includes("/Content/")) {
            anchor.setAttribute("target", "")
          }
          return anchor
        })
        try {
          setLoading(true)
          const text = await fetchBlogContent(blogId)
          setBlogContent(text)
        } catch (_error) {
          router.push("/404")
        } finally {
          setLoading(false)
        }
      } else if (blogIdMatch && language === "en") {
        const nextBlogId = blogId.replace(regex, "$1")
        router.push(`/blog/${nextBlogId}`)
      } else if (blogItemWithLang) {
        router.push(`/blog/${blogId}_lang_${language}`)
      }
    }
    fetchCurrentBlog()
  }, [blogId, language])

  useEffect(() => {
    const blogs = shuffle(blogsWithLang.filter(blog => blog.id !== blogId)).slice(0, 3)
    setMoreBlog(blogs)
  }, [blogId, blogsWithLang])

  const { isPortrait } = useCheckViewport()

  return (
    <Box>
      {loading ? (
        <LoadingPage height="80vh"></LoadingPage>
      ) : (
        <Box>
          <BlogContainer>
            <Box sx={{ width: "32rem", flexShrink: 0, position: "relative" }}>
              <BlogNavbar>
                <TOC />
              </BlogNavbar>
            </Box>
            <Box>
              <Typography sx={{ typography: "title", fontSize: ["2.8rem", "3.6rem"], lineHeight: ["3.8rem", "5rem"], maxWidth: "76rem" }}>
                {title}
              </Typography>
              <Typography
                sx={{ typography: "title", fontWeight: 400, color: "#6B6B6B", fontSize: "1.4rem", lineHeight: "2.4rem", mt: "1.6rem", mb: "4rem" }}
              >
                {date}
                <span className="px-[14px]">•</span>
                {type}
              </Typography>
              <ReactMarkdown
                children={blogContent as string}
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                className="markdown-body blog-detail"
              />
            </Box>
          </BlogContainer>

          {!!isPortrait && <MoreBlogs sx={{ pb: "10rem" }} blogs={moreBlog} title={LANGUAGE_MAP[language].more_articles}></MoreBlogs>}
        </Box>
      )}
    </Box>
  )
}

export default BlogDetail
