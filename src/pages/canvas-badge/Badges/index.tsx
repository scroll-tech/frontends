import { useMemo, useState } from "react"
import { useDebounce } from "react-use"
import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"
import useScrollTrigger from "@mui/material/useScrollTrigger"

import SectionWrapper from "@/components/SectionWrapper"
import { CATEGORY_LIST, NORMAL_HEADER_HEIGHT, SORT_LIST } from "@/constants"
import SearchInput from "@/pages/ecosystem/Protocols/SeachInput"

import Select from "../components/Select"
import BadgeList from "./BadgeList"

const useStyles = makeStyles()(theme => ({
  grid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "max-content 1fr max-content max-content",
    gridTemplateRows: "max-content 1fr",
    rowGap: "4rem",
    columnGap: "1.6rem",
    alignItems: "center",

    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr repeat(2, max-content)",
      gridTemplateRows: "min-content max-content",
      rowGap: "2.4rem",
      columnGap: "0.8rem",
    },

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "max-content minmax(12.9rem, 1fr)",
      gridTemplateRows: "repeat(3, min-content) 1fr",
      rowGap: "2.4rem",
      columnGap: "0.8rem",
    },
  },
  search: {
    justifySelf: "flex-end",
    [theme.breakpoints.down("lg")]: {
      justifySelf: "stretch",
    },
    [theme.breakpoints.down("md")]: {
      // width: "100%",
      justifySelf: "stretch",
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
  badgeList: {
    gridColumn: "1 / 5",
    justifySelf: "stretch",
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / 3",
    },
  },
}))

const Badges = () => {
  const trigger = useScrollTrigger()
  const { classes } = useStyles()
  const [searchInput, setSearchInput] = useState("")

  const [searchParams, setSearchParams] = useState({
    category: CATEGORY_LIST[0].key,
    sort: SORT_LIST[0].key,
    keyword: "",
    page: 1,
  })

  const stickyTop = useMemo(() => (trigger ? "2rem" : NORMAL_HEADER_HEIGHT), [trigger])

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
    <SectionWrapper dark sx={{ py: ["4rem", "12rem"] }}>
      <Box className={classes.grid}>
        <Typography
          className="canvas-badge-title"
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
          top={stickyTop}
          sticky
          value={searchParams.sort}
          onChange={e => handleChangeSelect(e.target.value, "sort")}
          items={SORT_LIST}
        ></Select>
        <Select
          className={classes.category}
          top={stickyTop}
          sticky
          value={searchParams.category}
          onChange={e => handleChangeSelect(e.target.value, "category")}
          items={CATEGORY_LIST}
        ></Select>
        <BadgeList className={classes.badgeList} searchParams={searchParams} onAddPage={handleChangePage}></BadgeList>
      </Box>
    </SectionWrapper>
  )
}

export default Badges
