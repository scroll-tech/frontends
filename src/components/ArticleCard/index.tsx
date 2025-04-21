import Image from "next/image"
import { useRouter } from "next/navigation"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

// import WebpImage from "@/components/WebpImage"

const Card = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "3rem",
  textAlign: "left",
  overflow: "hidden",
  cursor: "pointer",
  color: theme.vars.palette.text.primary,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.01)",
  },
  "&:hover *": {
    cursor: "pointer !important",
  },
  [theme.breakpoints.down("lg")]: {
    gap: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "0.8rem",
    padding: "2.8rem 0",
    "&:first-of-type": {
      paddingTop: "0",
    },
    "&:last-of-type": {
      paddingBottom: "0",
    },
    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${theme.vars.palette.themeBackground.highlight}`,
    },
  },
})) as typeof Box

const ArticleInfo = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    gridRow: 2,
  },
})) as typeof Box

const ArticlePoster = styled(Image)(({ theme }) => ({
  width: "100%",
  maxWidth: "51.7rem",
  borderRadius: "2.5rem",
  justifySelf: "flex-end",
  objectFit: "cover",
  [theme.breakpoints.down("lg")]: {
    height: "auto",
  },
  [theme.breakpoints.down("md")]: {
    gridRow: 1,
    borderRadius: "1.5rem",
  },
}))

const ArticleCard = props => {
  const { blog } = props
  const router = useRouter()
  const handleClick = () => {
    if (blog.externalLink) {
      window.location.href = blog.externalLink
    } else {
      router.push("/blog/" + blog.id)
    }
  }

  return (
    <Card onClick={handleClick}>
      <ArticleInfo>
        <Typography sx={{ typography: "title", fontSize: ["2rem", "2rem", "2.8rem"], lineHeight: ["3rem"] }}>{blog.title}</Typography>
        <Typography
          sx={{
            fontSize: ["1.8rem"],
            lineHeight: ["2.8rem"],
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            mt: "1.6rem",
            mb: "2.8rem",

            display: ["none", "none", "-webkit-box"],
          }}
        >
          {blog.summary}
        </Typography>
        <Typography sx={{ typography: "title", fontWeight: 400, color: "#6B6B6B", fontSize: "1.4rem", lineHeight: "normal", mt: ["4px", "8px", 0] }}>
          {blog.date} ・ {blog.type}
        </Typography>
      </ArticleInfo>
      {blog.posterImg && <ArticlePoster src={blog.posterImg} alt={blog.title} width={1000} height={180}></ArticlePoster>}
    </Card>
  )
}

export default ArticleCard
