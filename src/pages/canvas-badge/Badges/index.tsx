import { useMemo, useState } from "react"
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
    justifyItems: "flex-end",

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr max-content",
      gridTemplateRows: "unset",
      rowGap: "2rem",
      columnGap: "0.8rem",
      marginTop: "2rem",
    },
  },
  badgeList: {
    gridColumn: "1 / 5",
    justifySelf: "stretch",
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

  const handleChangeKeyword = e => {
    setSearchInput(e.target.value)
  }

  const handleChangeSelect = (value, field) => {
    setSearchParams(pre => ({
      ...pre,
      page: 1,
      network: value,
    }))
  }

  const handleChangePage = () => {
    setSearchParams(pre => ({
      ...pre,
      page: pre.page + 1,
    }))
  }

  return (
    <SectionWrapper dark sx={{ py: "12rem" }}>
      <Box className={classes.grid}>
        <Typography
          className="canvas-badge-title"
          sx={{
            fontSize: ["2.4rem", "4.8rem"],
            lineHeight: ["3.6rem", "6.4rem"],
            fontWeight: [600, 500],
            color: "primary.contrastText",
          }}
        >
          Discover Badges
        </Typography>
        <SearchInput dark top={stickyTop} sticky value={searchInput} onChange={handleChangeKeyword}></SearchInput>
        <Select top={stickyTop} sticky value={searchParams.sort} onChange={value => handleChangeSelect(value, "sort")} items={SORT_LIST}></Select>
        <Select
          top={stickyTop}
          sticky
          value={searchParams.category}
          onChange={value => handleChangeSelect(value, "category")}
          items={CATEGORY_LIST}
        ></Select>
        <BadgeList className={classes.badgeList} searchParams={searchParams} onAddPage={handleChangePage}></BadgeList>
      </Box>
    </SectionWrapper>
  )
}

export default Badges
