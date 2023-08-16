import { orderBy } from "lodash"
import { useEffect, useState } from "react"

import { Check as CheckIcon, Close as CloseIcon, Tune as TuneIcon } from "@mui/icons-material"
import { Box, Divider, Modal, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled } from "@mui/system"

import ArticleCard from "@/components/ArticleCard"

import blogSource from "./data.json"

const BlogContainer = styled(Box)(({ theme }) => ({
  padding: "0 6rem 14rem",
  [theme.breakpoints.down("md")]: {
    margin: "0 0 8rem",
    padding: "0 2rem 6rem",
  },
}))

const BlogBox = styled(Box)(({ theme }) => ({
  marginBottom: "9rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "0",
    padding: "3rem 0",
    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${theme.palette.themeBackground.highlight}`,
    },
  },
}))

const Header = styled(Box)(({ theme }) => ({
  padding: "15.5rem 0",
  display: "grid",
  gap: "6rem",
  gridTemplateColumns: "3fr 2fr",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    padding: "4.8rem 0",
  },
}))

const FilterContainer = styled(Box)({})

const FilterModal = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
})

const FilterModalContent = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: "0.6rem",
  width: "35.8rem",
  height: "64rem",
  paddingTop: "3rem",
}))

const BlogBody = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "3rem",
  gridTemplateColumns: "1fr 4fr",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}))

const FilterTypeName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.6rem",
  fontWeight: 600,
  marginBottom: "2rem",
  "&:nth-of-type(2)": {
    marginTop: "6.8rem",
  },
  [theme.breakpoints.down("md")]: {
    height: "60px",
    lineHeight: "60px",
    marginBottom: 0,
    fontSize: "1.4rem",
    paddingLeft: "3.3rem",
  },
}))

const FilterItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  cursor: "pointer",
  fontSize: "1.6rem",
  marginBottom: "1.2rem",
  "&.active": {
    fontWeight: 700,
  },
  "&:hover": {
    fontWeight: 700,
  },
  [theme.breakpoints.down("md")]: {
    height: "60px",
    lineHeight: "60px",
    marginBottom: 0,
    fontSize: "1.4rem",
    paddingLeft: "3.3rem",
    "&.active": {
      color: theme.palette.primary.main,
      background: "rgba(51, 51, 51, 0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: "1.6rem",
    },
  },
}))

const BlogList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    borderRight: "none",
    marginBottom: "0",
    justifyContent: "center",
  },
}))

const Blog = () => {
  const listType = ["Newest", "Oldest"]
  const categories = ["All", "Announcement", "General", "Technical"]
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  const isUnderLarge = useMediaQuery(theme.breakpoints.up("lg"))
  const [filterOpen, setFilterOpen] = useState(false)
  const handleFilterOpen = () => setFilterOpen(true)
  const handleFilterClose = () => setFilterOpen(false)

  const [blogs, setBlogs] = useState(blogSource)
  const [queryForm, setQueryForm] = useState({
    sort: "Newest",
    category: "All",
  })

  useEffect(() => {
    const blogs = orderBy(
      blogSource.filter(blog => blog.type === queryForm.category || queryForm.category === "All"),
      "date",
      queryForm.sort === "Newest" ? "desc" : "asc",
    )
    setBlogs(blogs)
  }, [queryForm])

  const hanleFilter = (attr: string, value: string) => {
    handleFilterClose()
    setQueryForm({
      ...queryForm,
      [attr]: value,
    })
  }

  const renderBlogs = () => {
    return (
      <BlogList>
        {blogs.map(blog => (
          <BlogBox key={blog.title}>
            <ArticleCard small={!isUnderLarge} blog={blog} />
          </BlogBox>
        ))}
      </BlogList>
    )
  }

  const renderFilter = () => {
    if (isDesktop) {
      return (
        <FilterContainer>
          <FilterTypeName>Category</FilterTypeName>
          {categories.map(category => (
            <FilterItem onClick={() => hanleFilter("category", category)} key={category} className={category === queryForm.category ? "active" : ""}>
              {category}
            </FilterItem>
          ))}

          <FilterTypeName sx={{ marginTop: "6.8rem" }}>Order by</FilterTypeName>
          {listType.map(type => (
            <FilterItem onClick={() => hanleFilter("sort", type)} key={type} className={type === queryForm.sort ? "active" : ""}>
              {type}
            </FilterItem>
          ))}
        </FilterContainer>
      )
    }
    return (
      <FilterContainer>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          onClick={handleFilterOpen}
          sx={{ marginBottom: "1.7rem", color: theme => theme.palette.link.main }}
        >
          <Typography sx={{ marginRight: "0.8rem", color: theme => theme.palette.link.main }}>Filters</Typography>
          <TuneIcon />
        </Box>
        <Modal open={filterOpen} onClose={handleFilterClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <FilterModal>
            <FilterModalContent>
              <Box sx={{ textAlign: "right" }}>
                <CloseIcon onClick={handleFilterClose} sx={{ fontSize: "2.8rem", marginRight: "1rem" }} />
              </Box>
              <Typography variant="h3" sx={{ paddingLeft: "3.3rem" }}>
                Filters
              </Typography>
              <FilterTypeName>Category</FilterTypeName>
              {categories.map(category => (
                <FilterItem
                  onClick={() => hanleFilter("category", category)}
                  key={category}
                  className={category === queryForm.category ? "active" : ""}
                >
                  {category} {category === queryForm.category ? <CheckIcon sx={{ fontSize: "3rem" }} /> : ""}
                </FilterItem>
              ))}
              <Divider sx={{ margin: "1rem 1.6rem 1rem 3.3rem" }} />
              <FilterTypeName>Order by</FilterTypeName>
              {listType.map(type => (
                <FilterItem onClick={() => hanleFilter("sort", type)} key={type} className={type === queryForm.sort ? "active" : ""}>
                  {type} {type === queryForm.sort ? <CheckIcon sx={{ fontSize: "3rem" }} /> : ""}
                </FilterItem>
              ))}
            </FilterModalContent>
          </FilterModal>
        </Modal>
      </FilterContainer>
    )
  }

  return (
    <BlogContainer>
      <Header>
        <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: 1, fontWeight: 600 }}>Scroll Blog</Typography>
        <Typography sx={{ fontSize: ["2rem", "2.6rem"], display: ["none", "block"], maxWidth: ["24.8", "68rem"] }}>
          Learn about Scroll’s technology, research, and latest developments.
        </Typography>
      </Header>
      <BlogBody>
        {renderFilter()}
        {renderBlogs()}
      </BlogBody>
    </BlogContainer>
  )
}

export default Blog
