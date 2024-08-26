import { useNavigate } from "react-router-dom"

import { Box, Button, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as ArrowSvg } from "@/assets/svgs/ecosystem/arrow.svg"
import WebpImage from "@/components/WebpImage"

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF8F3",
  borderRadius: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "16px 16px 24px 16px",
  cursor: "pointer",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("lg")]: {
    gap: "2rem",
  },
}))

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "2.4rem",
  lineHeight: "3.6rem",
  textAlign: "center",
  verticalAlign: "bottom",
  marginBottom: "0.6rem",
}))

const BlogPoster = styled(WebpImage)(({ theme }) => ({
  width: "100%",
  maxHeight: "23rem",
  borderRadius: "1rem",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    gridRow: 1,
    borderRadius: "1.5rem",
  },
}))

const ReadButton = styled(Button)(({ theme }) => ({
  gridArea: "action",
  alignSelf: "center",
  borderRadius: "0.8rem",
  padding: "0.8rem 2.4rem",
  fontSize: "1.8rem",
  height: "4rem",
  width: "10.6rem",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    justifySelf: "flex-start",
    fontSize: "1.6rem",
    width: "9.6rem",
  },
}))

const BlogCard = ({ blog }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/blog/" + blog.slug)
  }

  return (
    <Card onClick={handleClick}>
      <BlogPoster src={blog.posterImg}></BlogPoster>
      <BlogTitle>{blog.title}</BlogTitle>
      <ReadButton endIcon={<SvgIcon sx={{ fontSize: ["1.2rem !important", "1.4rem !important"] }} component={ArrowSvg} inheritViewBox></SvgIcon>}>
        Read
      </ReadButton>
    </Card>
  )
}

export default BlogCard
