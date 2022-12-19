import { Box, Typography, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import MarkdownNavbar from "markdown-navbar"
import "markdown-navbar/dist/navbar.css"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { Link as RouterLink } from "react-router-dom"
import { styled } from "@mui/system"
import { shuffle } from "lodash"
import blogSource from "./data.json"
import Articles from "./articles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

const MAX_H3_COUNT = 10

const Link = styled(RouterLink)({
  display: "flex",
  alignItems: "center",
  marginBottom: "2rem",
  "& *": {
    fontWeight: 500,
    color: "#202020",
  },
})

const BlogContainer = styled(Box)(
  ({ theme }) => `
    max-width: 100rem;
    padding: 8rem 0;
    overflow: hidden;
    display: flex;
  ${theme.breakpoints.down("md")} {
    padding: 4rem 1.6rem;
    display: block;
  };
  `,
)

const BlogNavbar = styled(Box)(({ theme }) => ({
  position: "fixed",
  width: "40rem",
  marginLeft: "10rem",
  paddingLeft: "2rem",
  borderLeft: "1px solid #C9CBCE",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const BlogDetail = () => {
  const [blog, setBlog] = useState<null | string>(null)
  const [moreBlog, setMoreBlog] = useState<any>([])
  const [currentBlog, setCurrentBlog] = useState<any>({
    title: "",
    content: "",
    posterImg: "",
  })

  const [loading, setLoading] = useState(true)
  const [hiddenHeadingsUnderLevel2, setHiddenHeadingsUnderLevel2] = useState(false)
  const params = useParams()

  useEffect(() => {
    getCurrentBlog()
    // @ts-ignore
    let anchors = [...document.querySelectorAll("a")]
    anchors.map(anchor => {
      if (anchor.href.includes("/blog/")) {
        anchor.setAttribute("target", "")
      }
    })
    try {
      const blogPath = require(`../../assets/blog/${params.blogId}.md`)
      fetch(blogPath)
        .then(response => response.text())
        .then(text => {
          handleHeadingsUnderLevel2(text)
          setLoading(false)
          setBlog(text)
        })
    } catch (error) {
      console.log(error)
    }
    getMoreBlog()
  }, [])

  const handleHeadingsUnderLevel2 = text => {
    const regexp = /### /gi
    const matches = text.match(regexp)
    const hiddenHeadingsUnderLevel2 = matches?.length > MAX_H3_COUNT
    setHiddenHeadingsUnderLevel2(hiddenHeadingsUnderLevel2)
  }

  const getMoreBlog = () => {
    const blogs = shuffle(blogSource.filter(blog => blog.id !== params.blogId)).slice(0, 3)
    setMoreBlog(blogs)
  }

  const getCurrentBlog = () => {
    const blog = blogSource.find(blog => blog.id === params.blogId)
    setCurrentBlog(blog)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const getPosterUri = () => {
    return window.location.origin + currentBlog.posterImg
  }

  const getUrl = () => {
    return window.location.href
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
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress sx={{ color: "#EB7106" }} />
        </Box>
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
                <Link to="/blog">
                  <ArrowBackIosIcon />
                  <Typography>All Articles</Typography>
                </Link>
                <MarkdownNavbar
                  className={`${hiddenHeadingsUnderLevel2 ? "hidden-levels" : ""} markdown-navbar`}
                  source={blog as string}
                  headingTopOffset={100}
                  ordered={false}
                />
              </BlogNavbar>
            </Box>
          </BlogContainer>
          {isMobile ? (
            <Box sx={{ paddingBottom: "6rem" }}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  marginBottom: {
                    md: "4rem",
                  },
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
