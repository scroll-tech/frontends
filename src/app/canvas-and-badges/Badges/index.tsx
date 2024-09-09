import { useMemo, useState } from "react"
import { useDebounce } from "react-use"
import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"
import useScrollTrigger from "@mui/material/useScrollTrigger"

import SearchInput from "@/app/ecosystem/Protocols/SearchInput"
import SectionWrapper from "@/components/SectionWrapper"
import { CANVAS_AND_BADGES_PAGE_SYMBOL, CATEGORY_LIST, NORMAL_HEADER_HEIGHT, SORT_LIST } from "@/constants"

import Select from "../components/Select"
import BadgeList from "./BadgeList"

const useStyles = makeStyles<any>()((theme, { stickyTop }) => ({
  grid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "max-content 1fr max-content max-content",
    gridTemplateRows: "max-content",
    rowGap: "4rem",
    columnGap: "1.6rem",
    alignItems: "center",
    marginBottom: "1.4rem",
    backgroundColor: theme.palette.themeBackground.dark,
    padding: "1.8rem 0",

    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr repeat(2, max-content)",
      gridTemplateRows: "repeat(2, min-content)",
      rowGap: "2.4rem",
      columnGap: "0.8rem",
      marginBottom: "0.6rem",
    },

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "max-content minmax(12.9rem, 1fr)",
      gridTemplateRows: "repeat(3, min-content)",
      // rowGap: "2.4rem",
      columnGap: "0.8rem",
    },

    [theme.breakpoints.up("md")]: {
      position: "sticky",
      top: stickyTop,
      zIndex: 1,
    },
  },
  search: {
    justifySelf: "flex-end",
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      justifySelf: "stretch",
    },
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / 3",
    },
  },
  sort: {
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / 1",
    },
  },
  category: {
    [theme.breakpoints.down("md")]: {
      gridColumn: "2 / 3",
    },
    [theme.breakpoints.down("sm")]: {},
  },
}))

const Badges = () => {
  const trigger = useScrollTrigger()
  const stickyTop = useMemo(() => (trigger ? 0 : NORMAL_HEADER_HEIGHT), [trigger])

  const { classes } = useStyles({ stickyTop })
  const [searchInput, setSearchInput] = useState("")

  const [searchParams, setSearchParams] = useState({
    category: CATEGORY_LIST[0].key,
    sort: SORT_LIST[0].key,
    keyword: "",
    page: 1,
  })

  useDebounce(
    () => {
      setSearchParams(pre => ({
        ...pre,
        page: 1,
        keyword: searchInput.trim(),
      }))
    },
    5e2,
    [searchInput],
  )

  const handleChangeKeyword = e => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const handleChangeSelect = (value, field) => {
    setSearchParams(pre => ({
      ...pre,
      page: 1,
      [field]: value,
    }))
  }

  const handleChangePage = () => {
    setSearchParams(pre => ({
      ...pre,
      page: pre.page + 1,
    }))
  }

  return (
    <SectionWrapper dark sx={{ pt: ["2.2rem", "10.2rem"], pb: ["2.2rem", "12rem"] }}>
      <div id={`${CANVAS_AND_BADGES_PAGE_SYMBOL}-discover`}></div>
      <Box className={classes.grid}>
        <Typography
          sx={{
            fontSize: ["2.4rem", "4.8rem"],
            lineHeight: ["3.6rem", "6.4rem"],
            fontWeight: 500,
            color: "primary.contrastText",
            gridColumn: ["span 2", "span 2", "span 4", "span 1"],
          }}
        >
          Discover Badges
        </Typography>
        <SearchInput className={classes.search} dark top={stickyTop} sticky value={searchInput} onChange={handleChangeKeyword}></SearchInput>
        <Select
          className={classes.sort}
          value={searchParams.sort}
          onChange={e => handleChangeSelect(e.target.value, "sort")}
          items={SORT_LIST}
        ></Select>
        <Select
          className={classes.category}
          value={searchParams.category}
          onChange={e => handleChangeSelect(e.target.value, "category")}
          items={CATEGORY_LIST}
        ></Select>
      </Box>
      <BadgeList searchParams={searchParams} onAddPage={handleChangePage}></BadgeList>
    </SectionWrapper>
  )
}

export default Badges
