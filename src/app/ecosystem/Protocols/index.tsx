"use client"

import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "react-use"
import { withStyles } from "tss-react/mui"

import { Box, Stack, Typography } from "@mui/material"
import useScrollTrigger from "@mui/material/useScrollTrigger"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_NETWORK_LIST, ECOSYSTEM_PAGE_SYMBOL, GET_IN_TOUCH_LINK, NORMAL_HEADER_HEIGHT } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import Category from "./Category"
import NetworkSelect from "./NetworkSelect"
import ProtocolList from "./ProtocolList"
import SearchInput from "./SearchInput"

const Grid = withStyles(Box, theme => ({
  root: {
    marginTop: "6.8rem",
    display: "grid",
    gridTemplateColumns: "max-content 1fr max-content",
    gridTemplateRows: "max-content 1fr",
    rowGap: "3rem",
    columnGap: "7.2rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr max-content",
      gridTemplateRows: "unset",
      rowGap: "2rem",
      columnGap: "0.8rem",
      marginTop: "2rem",
    },
  },
}))

const Protocols = () => {
  const trigger = useScrollTrigger()
  const { isMobile, isTablet, isLandscape } = useCheckViewport()
  const [searchInput, setSearchInput] = useState("")
  const [searchParams, setSearchParams] = useState({
    category: "All categories",
    network: ECOSYSTEM_NETWORK_LIST[0],
    keyword: "",
    page: 1,
  })
  const [isSticky, setIsSticky] = useState(true)

  const stickyTop = useMemo(() => (trigger ? "2rem" : NORMAL_HEADER_HEIGHT), [trigger])

  useEffect(() => {
    if (isLandscape) {
      const handleDetectSticky = () => {
        const categoryEle = document.querySelector(".ecosystem-protocols-category") as HTMLElement
        setIsSticky(categoryEle.getBoundingClientRect().top >= parseFloat(stickyTop) * 10)
      }
      window.addEventListener("scroll", handleDetectSticky, false)
      return () => {
        window.removeEventListener("scroll", handleDetectSticky, false)
      }
    }
  }, [isLandscape, stickyTop])

  const handleChangeCategory = value => {
    setSearchParams(pre => ({
      ...pre,
      page: 1,
      category: value,
    }))
  }

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
    setSearchInput(e.target.value)
  }
  const handleChangeNetwork = value => {
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
    <SectionWrapper sx={{ pt: ["4rem", "5.5rem", "6rem"] }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap="2rem">
        <Typography
          className="ecosystem-protocols-title"
          sx={{ fontSize: ["2.4rem", "4.4rem"], lineHeight: ["3.6rem", "5.6rem"], fontWeight: [600, 500], flex: 1 }}
        >
          Browse all protocols
        </Typography>
        {isMobile ? null : (
          <Button width={isTablet ? "21.5rem" : "25rem"} href={GET_IN_TOUCH_LINK} target="_blank" color="primary">
            Get in touch
          </Button>
        )}
      </Stack>
      <Grid id={`${ECOSYSTEM_PAGE_SYMBOL}-protocols`}>
        <Category top={stickyTop} value={searchParams.category} onChange={handleChangeCategory}></Category>
        <SearchInput top={stickyTop} sticky={isSticky} value={searchInput} onChange={handleChangeKeyword}></SearchInput>
        <NetworkSelect top={stickyTop} sticky={isSticky} value={searchParams.network} onChange={handleChangeNetwork}></NetworkSelect>
        <ProtocolList searchParams={searchParams} onAddPage={handleChangePage}></ProtocolList>
      </Grid>
    </SectionWrapper>
  )
}
export default Protocols
