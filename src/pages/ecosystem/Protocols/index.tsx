import { useEffect, useState } from "react"
import { useDebounce } from "react-use"
import { withStyles } from "tss-react/mui"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_NETWORK_LIST, LIST_YOUR_DAPP_LINK, NORMAL_HEADER_HEIGHT } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import Category from "./Category"
import NetworkSelect from "./NetworkSelect"
import ProtocolList from "./ProtocolList"
import SearchInput from "./SeachInput"

const fixedMargin = (parseFloat(NORMAL_HEADER_HEIGHT) + 0.5) * 10

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
  const { isMobile, isTablet, isLandscape } = useCheckViewport()
  const [searchInput, setSearchInput] = useState("")
  const [searchParams, setSearchParams] = useState({
    category: "All categories",
    network: ECOSYSTEM_NETWORK_LIST[0],
    keyword: "",
    page: 1,
  })
  const [isSticky, setIsSticky] = useState(true)

  useEffect(() => {
    if (isLandscape) {
      const handleDetectSticky = () => {
        const categoryEle = document.querySelector(".ecosystem-protocols-category") as HTMLElement
        setIsSticky(categoryEle.getBoundingClientRect().top >= fixedMargin)
      }
      window.addEventListener("scroll", handleDetectSticky, false)
      return () => {
        window.removeEventListener("scroll", handleDetectSticky, false)
      }
    }
  }, [isLandscape])

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
        keyword: searchInput,
      }))
    },
    5e2,
    [searchInput],
  )

  const handleChangeKeyword = e => {
    const nextValue = e.target.value.trim() || ""
    setSearchInput(nextValue)
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
        <Button width={isMobile ? "15.4rem" : isTablet ? "21.5rem" : "25rem"} href={LIST_YOUR_DAPP_LINK} target="_blank" color="primary">
          List your Dapp
        </Button>
      </Stack>
      <Grid>
        <Category value={searchParams.category} onChange={handleChangeCategory}></Category>
        <SearchInput sticky={isSticky} value={searchInput} onChange={handleChangeKeyword}></SearchInput>
        <NetworkSelect sticky={isSticky} value={searchParams.network} onChange={handleChangeNetwork}></NetworkSelect>
        <ProtocolList searchParams={searchParams} onAddPage={handleChangePage}></ProtocolList>
      </Grid>
    </SectionWrapper>
  )
}
export default Protocols
