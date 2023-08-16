import { useNavigate } from "react-router-dom"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import WebpImage from "@/components/WebpImage"

const ArticleTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  cursor: "pointer",
  lineHeight: "2.8rem",
  display: "table-cell",
  verticalAlign: "bottom",
  marginBottom: "0.6rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
}))

const Card = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "3rem",
  textAlign: "left",
  margin: "0 auto",
  overflow: "hidden",
  color: theme.palette.text.primary,
  "&:hover *": {
    cursor: "pointer",
    color: "#6d6d6d",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "2rem",
  },
}))

const ArticleDate = styled(Typography)(({ theme }) => ({
  marginBottom: "0.5rem",
  fontSize: "1.4rem",
  fontWeight: 500,
  [theme.breakpoints.down("md")]: {
    marginTop: "1.4rem",
  },
}))

const ArticleSummary = styled(Typography)(({ theme }) => ({
  marginBottom: "2.2rem",
  overflow: "hidden",
  maxWidth: "44rem",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": 2,
  "-webkit-box-orient": "vertical",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const ArticleInfo = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    gridRow: 2,
  },
}))

const ArticlePoster = styled(WebpImage)(({ theme }) => ({
  width: "100%",
  maxWidth: "51.7rem",
  height: "auto",
  cursor: "pointer",
  borderRadius: "2.5rem",
  [theme.breakpoints.down("md")]: {
    gridRow: 1,
  },
}))

const ArticleCard = ({ blog, small = false }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    if (blog.externalLink) {
      window.location.href = blog.externalLink
    } else {
      navigate("/blog/" + blog.id)
    }
  }

  return (
    <Card>
      <ArticleInfo>
        <ArticleTitle onClick={handleClick} variant="H4">
          {blog.title}
        </ArticleTitle>
        <ArticleSummary variant="Body3">{blog.summary}</ArticleSummary>
        <ArticleDate variant="body2">
          {blog.date} ・ {blog.type}
        </ArticleDate>
      </ArticleInfo>
      <ArticlePoster
        src="https://cdn.discordapp.com/attachments/1095150664881016856/1141254540994297867/cover.png"
        onClick={handleClick}
      ></ArticlePoster>
    </Card>
  )
}

export default ArticleCard
