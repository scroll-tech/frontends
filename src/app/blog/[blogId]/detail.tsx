"use client"

import { shuffle } from "lodash"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import LoadingPage from "@/components/LoadingPage"
import useCheckViewport from "@/hooks/useCheckViewport"

import Articles from "./articles"
import TOC from "./components/tableOfContents"
import blogSource from "./data.json"

const BlogContainer = styled(Box)(
  ({ theme }) => `
    max-width: 100rem;
    padding: 8rem 6rem 14rem;
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
  width: "40rem",
  marginLeft: "4rem",
  maxWidth: "30vw",
  paddingLeft: "2rem",
  borderLeft: `1px solid ${theme.palette.border.main}`,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const BlogDetail = () => {
  const router = useRouter()
  const { blogId } = useParams()

  const [blog, setBlog] = useState<null | string>(null)
  const [moreBlog, setMoreBlog] = useState<any>([])
  const [currentBlog, setCurrentBlog] = useState<any>({
    title: "",
    content: "",
    posterImg: "",
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (blogId === "scrollsFreshCoat") {
      router.push("/blog/scrolls-fresh-coat")
      return
    }
    getCurrentBlog()
    // @ts-ignore
    let anchors = [...document.querySelectorAll("a")]
    anchors.map(anchor => {
      if (anchor.href.includes("/blog/")) {
        anchor.setAttribute("target", "")
      }
      return anchor
    })
    try {
      import(`../../../assets/blog/${blogId}.md`).then(res => {
        setLoading(false)
        setBlog(res.default)
      })
    } catch (error) {
      router.push("/404")
    }
    getMoreBlog()
  }, [blogId])

  const getMoreBlog = () => {
    const blogs = shuffle(blogSource.filter(blog => blog.id !== blogId)).slice(0, 3)
    setMoreBlog(blogs)
  }

  const getCurrentBlog = () => {
    const blog = blogSource.find(blog => blog.id === blogId)
    setCurrentBlog(blog)
  }

  const { isPortrait } = useCheckViewport()

  const getPosterUri = () => {
    return window.location.origin + (currentBlog.ogImg || currentBlog.posterImg)
  }

  return (
    <Box>
      {loading ? (
        <LoadingPage height="80vh"></LoadingPage>
      ) : (
        <Box>
          <BlogContainer className="wrapper">
            <ReactMarkdown
              children={blog as string}
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              className="markdown-body"
            />
            <Box sx={{ width: "32rem", flexShrink: 0, position: "relative" }}>
              <BlogNavbar>
                <TOC />
              </BlogNavbar>
            </Box>
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
                More articles from Scroll
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
