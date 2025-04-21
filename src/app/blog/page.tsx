"use client"

import { orderBy } from "lodash"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { Tune as TuneIcon } from "@mui/icons-material"
import { Box, Modal, Typography } from "@mui/material"
import { styled } from "@mui/system"

import blogSource from "@/assets/blog/main.data.json"
import ArticleCard from "@/components/ArticleCard"
import SectionWrapper from "@/components/SectionWrapper"
import { LANGUAGE_MAP, getBlogCategoryList, getBlogSortList } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import { filterBlogsByLanguage } from "@/utils"

const FilterContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "flex",
    justifyContent: "flex-end",
  },
})) as typeof Box

const MobileFilter = styled(Box)(({ theme }) => ({
  marginBottom: "1.7rem",
  fontSize: "1.6rem",
  fontWeight: 500,
  color: theme.vars.palette.text.primary,
  cursor: "pointer",
  borderRadius: "20px",
  border: `1px solid ${theme.vars.palette.text.primary}`,
  width: "fit-content",
  padding: "0.5rem 1.2rem",
  [theme.breakpoints.between("sm", "lg")]: {
    marginBottom: "3rem",
  },
})) as typeof Box

const FilterModal = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}) as typeof Box

const FilterModalContent = styled(Box)(({ theme }) => ({
  background: theme.vars.palette.background.default,
  borderRadius: "2rem",
  width: "35.8rem",
  padding: "1.4rem 1.8rem",
})) as typeof Box

const BlogBody = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "3rem",
  gridTemplateColumns: "1fr 4fr",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
    gap: "0",
  },
})) as typeof Box

const FilterTypeName = styled(Typography)(({ theme }) => ({
  color: theme.vars.palette.text.primary,
  fontSize: "1.6rem",
  fontFamily: "var(--font-title)",
  lineHeight: 1,
  fontWeight: 500,
  marginBottom: "2.8rem",

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
  color: theme.vars.palette.text.primary,
  cursor: "pointer",
  fontSize: "1.6rem",
  lineHeight: 1,
  marginBottom: "2.2rem",
  "&.active": {
    fontWeight: 600,
  },
  "&:hover": {
    fontWeight: 600,
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
  gap: "4.8rem",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    borderRight: "none",
    marginBottom: "0",
    justifyContent: "center",
  },

  [theme.breakpoints.down("sm")]: {
    gap: 0,
  },
}))

const Blog = () => {
  const searchParams = useSearchParams()
  const { isDesktop } = useCheckViewport()
  const language = "en"
  const BLOG_CATEGORY_LIST = useMemo(() => getBlogCategoryList(language), [language])
  const BLOG_SORT_LIST = useMemo(() => getBlogSortList(language), [language])
  const BLOG_COPY = useMemo(() => LANGUAGE_MAP[language], [language])
  const [filterOpen, setFilterOpen] = useState(false)
  const handleFilterOpen = () => setFilterOpen(true)
  const handleFilterClose = () => setFilterOpen(false)

  const [blogs, setBlogs] = useState(blogSource)
  const [queryForm, setQueryForm] = useState({
    sort: "Newest",
    category: searchParams?.get("category") ?? "All",
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
          // <BlogBox key={blog.slug}>
          <ArticleCard key={blog.slug} small={!isDesktop} blog={blog} />
          // </BlogBox>
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
    <SectionWrapper sx={{ pt: 0, pb: ["15rem", "25rem"] }}>
      <Box sx={{ pt: ["65.rem", "15.5rem"], pb: ["4.4rem", "12.5rem"] }}>
        <Typography sx={{ typography: "title", fontSize: ["2.8rem", "4.8rem"], lineHeight: ["3.8rem", "8rem"] }}>{BLOG_COPY.title}</Typography>
        <Typography sx={{ fontSize: ["1.6rem", "2.6rem"], lineHeight: "normal", maxWidth: "54rem", mt: ["1.2rem", "2rem"] }}>
          {BLOG_COPY.sub_title}
        </Typography>
      </Box>
      <BlogBody>
        {renderFilter()}
        {renderBlogs()}
      </BlogBody>
    </SectionWrapper>
  )
}

export default Blog
