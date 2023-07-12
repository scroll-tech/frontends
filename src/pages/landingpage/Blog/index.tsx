import { useEffect, useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { blogListUrl } from "@/apis/blog"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import { BRANCH_NAME } from "@/constants/common"

interface BlogItem {
  title: string
  summary: string
  url: string
  cover: string
}

const Container = styled(SectionWrapper)(({ theme }) => ({
  paddingBottom: "16rem",
}))

const BlogGrid = styled(Box)(({ theme }) => {
  const afterContentStyles = {
    content: '""',
    width: "2.3rem",
    height: "2.3rem",
    background: "url(/imgs/home/more.png) center / cover no-repeat",
    position: "absolute",
    right: "3rem",
  }

  return {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    "& > .blog-card": {
      marginBottom: "calc((30 / 1392)* 100%)",
      position: "relative",
      "&:nth-of-type(1):after": {
        ...afterContentStyles,
        top: "27rem",
      },
      "&:not(:nth-of-type(1)):after": {
        ...afterContentStyles,
        top: "3rem",
      },
    },
    "& > .blog-card:nth-of-type(1)": {
      width: "calc((680 / 1392)* 100%)",
    },
    [`& > .blog-card:nth-of-type(2), & > .blog-card:nth-of-type(3)`]: {
      width: "calc((326 / 1392)* 100%)",
    },
    "&.secend-line": {
      flexDirection: "row-reverse",
    },
    [theme.breakpoints.down("md")]: {
      "& > .blog-card": {
        marginBottom: "calc((20 / 390)* 100%)",
        "&:nth-of-type(1):after": {
          display: "none",
        },
        "&:not(:nth-of-type(1)):after": {
          ...afterContentStyles,
          width: "1.3rem",
          height: "1.3rem",
          right: "2rem",
          top: "2rem",
        },
      },
      [`& > .blog-card:nth-of-type(1)`]: {
        width: "100%",
      },
      [`& > .blog-card:nth-of-type(2), & > .blog-card:nth-of-type(3)`]: {
        width: "calc((185 / 390)* 100%)",
      },
      "&.secend-line": {
        flexDirection: "row",
      },
    },
  }
})

const BlogCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: "2.5rem",
  background: " #FFF0DD",
  height: "45.8rem",
  "&:hover": {
    cursor: "pointer",
    background: "#FFDEB5",
  },
  [theme.breakpoints.down("md")]: {
    paddingBottom: "2rem",
    height: "26rem",
  },
}))

const BlogPost = styled(Box)(({ theme }) => ({
  height: "22.9rem",
  borderRadius: "2.5rem",
  width: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  flexShrink: 0,
  [theme.breakpoints.down("md")]: {
    height: "13.2rem",
  },
}))

const BlogTitle = styled(Typography)(({ theme }) => ({
  marginTop: "3.7rem",
  marginBottom: "2.5rem",
  padding: "0 3rem",
  textAlign: "left",
  width: "100%",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
    lineHeight: "normal",
    padding: "0 1.8rem",
    marginTop: "1.4rem",
    marginBottom: "1rem",
  },
}))
const BlogContent = styled(Typography)(({ theme }) => ({
  padding: "0 3rem",
  textAlign: "left",
  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: "4",
  WebkitBoxOrient: "vertical",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
    lineHeight: "normal",
    padding: "0 1.8rem",
  },
}))

const Blog = () => {
  const [, setLoading] = useState(false)
  const [blogList, setBlogList] = useState<BlogItem[][]>([])

  useEffect(() => {
    setLoading(true)
    scrollRequest(`${blogListUrl}blog-${BRANCH_NAME}.json`)
      .then((response: BlogItem[]) => {
        setBlogList([response.slice(0, 3), response.slice(3)])
      })
      .catch(error => {
        // console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Container>
      <SectionHeader
        sx={{ mb: "12rem" }}
        title="Begin your Scroll journey"
        content="Learn more about zero knowledge proofs, zkEVMs and the future of scaling Ethereum."
      />

      {blogList.map((item, index) => (
        <BlogGrid key={index} className={index === 1 ? "secend-line" : "first-line"}>
          {item.map((blog, idx) => {
            const { title, summary, cover } = blog
            return (
              <BlogCard key={idx} className={idx === 0 ? "large blog-card" : "blog-card"}>
                <BlogPost sx={{ backgroundImage: idx === 0 ? `url(${cover})` : "" }}></BlogPost>
                <BlogTitle variant="H4">{title}</BlogTitle>
                <BlogContent variant="Body3">{summary}</BlogContent>
              </BlogCard>
            )
          })}
        </BlogGrid>
      ))}
    </Container>
  )
}

export default Blog
