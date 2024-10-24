import { orderBy } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

import { Tune as TuneIcon } from "@mui/icons-material"
import { Box, Modal, Typography } from "@mui/material"
import { styled } from "@mui/system"

import ArticleCard from "@/components/ArticleCard"
import SectionWrapper from "@/components/SectionWrapper"
import { LANGUAGE_MAP, getBlogCategoryList, getBlogSortList } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import useUserLanguage from "@/hooks/useUserLanguage"
import { filterBlogsByLanguage } from "@/utils"

import blogSource from "./data.json"

const BlogContainer = styled(Box)(({ theme }) => ({
  padding: "0 6rem 14rem",
  [theme.breakpoints.down("md")]: {
    padding: "0 2rem 9rem",
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
    "&:first-of-type": {
      padding: "0 0 3rem",
    },
  },
}))

const Header = styled(Box)(({ theme }) => ({
  padding: "15.5rem 0",
  [theme.breakpoints.down("md")]: {
    padding: "6.8rem 0 8rem",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "6.4rem",
  lineHeight: 1,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "3.6rem",
  },
}))

const Summary = styled(Typography)(({ theme }) => ({
  fontSize: "2.6rem",
  maxWidth: "56rem",
  marginTop: "2.4rem",
  [theme.breakpoints.down("md")]: {
    marginTop: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}))

const FilterContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

const MobileFilter = styled(Box)(({ theme }) => ({
  marginBottom: "1.7rem",
  fontSize: "1.6rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
  cursor: "pointer",
  borderRadius: "20px",
  border: `1px solid ${theme.palette.text.primary}`,
  width: "fit-content",
  padding: "0.5rem 1.2rem",
  [theme.breakpoints.between("sm", "lg")]: {
    marginBottom: "3rem",
  },
}))

const FilterModal = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
})

const FilterModalContent = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: "2rem",
  width: "35.8rem",
  padding: "1.4rem 1.8rem",
}))

const BlogBody = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "3rem",
  gridTemplateColumns: "1fr 4fr",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
    gap: "0",
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
  [theme.breakpoints.down("lg")]: {
    height: "4rem",
    lineHeight: "4rem",
    marginBottom: 0,
    fontSize: "2rem",
    "&:nth-of-type(2)": {
      marginTop: "5rem",
    },
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
  [theme.breakpoints.down("lg")]: {
    fontWeight: 500,
    height: "3.6rem",
    lineHeight: "3.6rem",
    marginBottom: 0,
    fontSize: "1.8rem",
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
  const location = useLocation()
  const { isDesktop } = useCheckViewport()
  const [language] = useUserLanguage()
  const BLOG_CATEGORY_LIST = useMemo(() => getBlogCategoryList(language), [language])
  const BLOG_SORT_LIST = useMemo(() => getBlogSortList(language), [language])
  const BLOG_COPY = useMemo(() => LANGUAGE_MAP[language], [language])
  const [filterOpen, setFilterOpen] = useState(false)
  const handleFilterOpen = () => setFilterOpen(true)
  const handleFilterClose = () => setFilterOpen(false)

  const category = location.state?.category ?? "All"

  const [blogs, setBlogs] = useState(blogSource)
  const [queryForm, setQueryForm] = useState({
    sort: "Newest",
    category,
  })

  const blogsWithLang = useMemo(() => filterBlogsByLanguage(blogSource, language), [blogSource, language])

  useEffect(() => {
    const blogs = orderBy(
      blogsWithLang.filter(blog => blog.type === queryForm.category || queryForm.category === "All"),
      "date",
      queryForm.sort === "Newest" ? "desc" : "asc",
    )
    setBlogs(blogs)
  }, [queryForm, blogsWithLang])

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
          <BlogBox key={blog.slug}>
            <ArticleCard small={!isDesktop} blog={blog} />
          </BlogBox>
        ))}
      </BlogList>
    )
  }

  const renderFilter = () => {
    if (isDesktop) {
      return (
        <FilterContainer>
          <FilterTypeName>{BLOG_COPY.category}</FilterTypeName>
          {BLOG_CATEGORY_LIST.map(({ label, key }) => (
            <FilterItem onClick={() => hanleFilter("category", key)} key={key} className={key === queryForm.category ? "active" : ""}>
              {label}
            </FilterItem>
          ))}

          <FilterTypeName sx={{ marginTop: "6.8rem" }}>{BLOG_COPY.sort}</FilterTypeName>
          {BLOG_SORT_LIST.map(({ label, key }) => (
            <FilterItem onClick={() => hanleFilter("sort", key)} key={key} className={key === queryForm.sort ? "active" : ""}>
              {label}
            </FilterItem>
          ))}
        </FilterContainer>
      )
    }
    return (
      <FilterContainer>
        <MobileFilter display="flex" justifyContent="flex-end" alignItems="center" onClick={handleFilterOpen}>
          <TuneIcon sx={{ marginRight: "1rem", fontSize: "" }} />
          <Typography>{BLOG_COPY.filters}</Typography>
        </MobileFilter>
        <Modal open={filterOpen} onClose={handleFilterClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <FilterModal>
            <FilterModalContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4rem" }}>
                <Typography sx={{ fontWeight: 600, fontSize: "2.8rem" }}>Filters</Typography>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleFilterClose} width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.731 1.56775C18.0897 1.20911 18.0897 0.627628 17.731 0.268984C17.3724 -0.0896612 16.7909 -0.0896612 16.4322 0.268984L9 7.70123L1.56775 0.268984C1.20911 -0.0896611 0.627629 -0.0896611 0.268984 0.268984C-0.0896607 0.627628 -0.0896607 1.20911 0.268984 1.56775L7.70123 9L0.268984 16.4323C-0.0896612 16.7909 -0.0896612 17.3724 0.268984 17.731C0.627628 18.0897 1.20911 18.0897 1.56775 17.731L17.731 1.56775ZM12.0065 10.7078C11.6479 10.3491 11.0664 10.3491 10.7078 10.7078C10.3491 11.0664 10.3491 11.6479 10.7078 12.0065L16.4322 17.731C16.7909 18.0897 17.3724 18.0897 17.731 17.731C18.0897 17.3724 18.0897 16.7909 17.731 16.4322L12.0065 10.7078Z"
                    fill="black"
                  />
                </svg>
              </Box>

              <FilterTypeName>Category</FilterTypeName>
              {BLOG_CATEGORY_LIST.map(({ label, key }) => (
                <FilterItem onClick={() => hanleFilter("category", key)} key={key} className={key === queryForm.category ? "active" : ""}>
                  {label}
                </FilterItem>
              ))}
              <FilterTypeName sx={{ marginTop: "5rem" }}>Order by</FilterTypeName>
              {BLOG_SORT_LIST.map(({ label, key }) => (
                <FilterItem onClick={() => hanleFilter("sort", key)} key={key} className={key === queryForm.sort ? "active" : ""}>
                  {label}
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
      <SectionWrapper sx={{ pt: 0 }}>
        <Header>
          <Title>{BLOG_COPY.title}</Title>
          <Summary>{BLOG_COPY.sub_title}</Summary>
        </Header>
        <BlogBody>
          {renderFilter()}
          {renderBlogs()}
        </BlogBody>
      </SectionWrapper>
    </BlogContainer>
  )
}

export default Blog
