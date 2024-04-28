import { shuffle } from "lodash"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import ReactMarkdown from "react-markdown"
import { useNavigate, useParams } from "react-router-dom"
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
  const navigate = useNavigate()
  const [blog, setBlog] = useState<null | string>(null)
  const [moreBlog, setMoreBlog] = useState<any>([])
  const [currentBlog, setCurrentBlog] = useState<any>({
    title: "",
    content: "",
    posterImg: "",
  })

  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
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
      const blogPath = `https://misc-pages-ghost-relay.vercel.app/api/post/${params.blogId.toLowerCase()}.md?title=1`
      fetch(blogPath)
        .then(response => response.text())
        .then(text => {
          setLoading(false)
          setBlog(text)
        })
    } catch (error) {
      navigate("/404")
    }
    getMoreBlog()
  }, [params.blogId])

  const getMoreBlog = () => {
    const blogs = shuffle(blogSource.filter(blog => blog.id !== params.blogId.toLowerCase())).slice(0, 3)
    setMoreBlog(blogs)
  }

  const getCurrentBlog = () => {
    const blog = blogSource.find(blog => blog.id === params.blogId.toLowerCase())
    setCurrentBlog(blog)
  }

  const { isPortrait } = useCheckViewport()

  const getPosterUri = () => {
    return currentBlog.ogImg || currentBlog.posterImg
  }

  return (
    <Box>
      <Helmet>
        <title>{currentBlog.title} - Scroll</title>
        <meta name="description" content={currentBlog.summary} />
        <meta property="og:title" content={currentBlog.title + " - Scroll"} />
        <meta property="og:description" content={currentBlog.summary} />
        <meta property="og:image" content={getPosterUri()} />
        <meta property="og:url" content={currentBlog.canonical || `https://scroll.io/blog/${currentBlog.id}`} />
        <meta name="twitter:title" content={currentBlog.title + " - Scroll"} />
        <meta name="twitter:description" content={currentBlog.summary} />
        <meta name="twitter:image" content={getPosterUri()} />
        {currentBlog.canonical && <link rel="canonical" href={currentBlog.canonical} />}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
          integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"
          crossOrigin="anonymous"
        />
      </Helmet>
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
              children={blog as string}
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
