"use client"

import { shuffle } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import useStorage from "squirrel-gill"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import LoadingPage from "@/components/LoadingPage"
import { LANGUAGE_MAP } from "@/constants"
import { BLOG_LANGUAGE } from "@/constants/storageKey"
import useCheckViewport from "@/hooks/useCheckViewport"
import { filterBlogsByLanguage } from "@/utils"

import Articles from "./articles"
import TOC from "./components/tableOfContents"
import blogSource from "./data.json"

const BlogContainer = styled(Box)(
  ({ theme }) => `
    max-width: 140rem;
    padding: 6rem 4rem 14rem;
    overflow: visible;
    display: flex;
  ${theme.breakpoints.down("md")} {
    padding: 4rem 2rem;
    display: block;
    overflow: hidden;
  };
  `,
)

const BlogNavbar = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: "14rem",
  maxWidth: "32vw",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const BlogDetail = () => {
  const params = useParams<{ blogId: string }>()

  const [language] = useStorage(localStorage, BLOG_LANGUAGE, "en")
  const [blogContent, setBlogContent] = useState<null | string>(null)
  const [moreBlog, setMoreBlog] = useState<any>([])

  const [loading, setLoading] = useState(true)

  const blogsWithLang = useMemo(() => filterBlogsByLanguage(blogSource, language), [blogSource, language])

  useEffect(() => {
    const regex = /([^_]*?)_lang_[^_]+/g
    const blogId = params.blogId.toLowerCase()
    const blogIdMatch = blogId.match(regex)

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
        const blogPath = `https://blog.scroll.cat/api/post/${blogId}.md?title=1`
        setLoading(true)
        fetch(blogPath)
          .then(response => response.text())
          .then(text => {
            setLoading(false)
            setBlogContent(text)
          })
      } catch (error) {
        navigate("/404")
      }
    } else if (blogIdMatch && language === "en") {
      const nextBlogId = blogId.replace(regex, "$1")
      navigate(`/blog/${nextBlogId}`)
    } else if (blogItemWithLang) {
      navigate(`/blog/${params.blogId}_lang_${language}`)
    }
  }, [params.blogId, language])

  useEffect(() => {
    const blogs = shuffle(blogsWithLang.filter(blog => blog.id !== params.blogId.toLowerCase())).slice(0, 3)
    setMoreBlog(blogs)
  }, [params.blogId, blogsWithLang])

  const { isPortrait } = useCheckViewport()

  return (
    <Box>
      {loading ? (
        <LoadingPage height="80vh"></LoadingPage>
      ) : (
        <Box>
          <BlogContainer className="wrapper">
            <Box sx={{ width: "32rem", flexShrink: 0, position: "relative" }}>
              <BlogNavbar>
                <TOC />
              </BlogNavbar>
            </Box>
            <ReactMarkdown
              children={blogContent as string}
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              className="markdown-body"
            />
          </BlogContainer>
          {isPortrait ? (
            <Box sx={{ paddingBottom: "10rem" }}>
              <Typography
                variant="h1"
                sx={{
                  textAlign: "center",
                  mt: ["3rem", "5rem"],
                  mb: ["2rem", "3rem"],
                }}
              >
                {LANGUAGE_MAP[language].more_articles}
              </Typography>
              <Articles blogs={moreBlog} />
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  )
}

export default BlogDetail
