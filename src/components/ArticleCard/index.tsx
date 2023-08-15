import { useNavigate } from "react-router-dom"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import WebpImage from "@/components/WebpImage"

const ArticleInfo = styled(Box)(({ theme }) => ({}))

const ArticleTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  cursor: "pointer",
  lineHeight: "2.8rem",
  display: "table-cell",
  verticalAlign: "bottom",
  marginBottom: "0.6rem",
}))

const Card = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "3rem",
  textAlign: "left",
  margin: "0 auto",
  overflow: "hidden",
  "&.small": {
    maxWidth: "38rem",
    flexDirection: "column",
    boxShadow: "rgb(0 0 0 / 15%) 5px 5px 3px",
    borderRadius: `${theme.shape.borderRadius}px`,
  },
}))

const ArticleDate = styled(Typography)({
  marginBottom: "0.5rem",
  fontSize: "1.4rem",
  fontWeight: 500,
})

const ArticleSummary = styled(Typography)({
  marginBottom: "2.2rem",
  overflow: "hidden",
  maxWidth: "44rem",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": 2,
  "-webkit-box-orient": "vertical",
})

const ArticlePoster = styled(WebpImage)(({ theme }) => ({
  width: "38rem",
  height: "23.3rem",
  cursor: "pointer",
  borderRadius: "2.5rem",
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
      <ArticlePoster src={blog.posterImg} webpsrc={blog.posterImg.replace(".jpg", ".webp")} onClick={handleClick}></ArticlePoster>
    </Card>
  )
}

export default ArticleCard
