import { useMemo, useState } from "react"

import { Stack, Typography } from "@mui/material"
import useScrollTrigger from "@mui/material/useScrollTrigger"

import SectionWrapper from "@/components/SectionWrapper"
import { CATEGORY_LIST, NORMAL_HEADER_HEIGHT, SORT_LIST } from "@/constants"
import SearchInput from "@/pages/ecosystem/Protocols/SeachInput"

import Select from "../components/Select"
import BadgeList from "./BadgeList"

const Badges = () => {
  const trigger = useScrollTrigger()

  const [searchInput, setSearchInput] = useState("")

  const [searchParams, setSearchParams] = useState({
    category: CATEGORY_LIST[0].key,
    sort: SORT_LIST[0].key,
    keyword: "",
    page: 1,
  })
  const [isSticky] = useState(true)

  const stickyTop = useMemo(() => (trigger ? "2rem" : NORMAL_HEADER_HEIGHT), [trigger])
  console.log(isSticky, stickyTop, "isSticky")
  // useEffect(() => {
  //   if (isLandscape) {
  //     const handleDetectSticky = () => {
  //       const filterEle = document.querySelector("#canvas-badge-filter") as HTMLElement
  //       console.log(filterEle.getBoundingClientRect().top, "top")
  //       setIsSticky(filterEle.getBoundingClientRect().top <= parseFloat(stickyTop) * 10)
  //     }
  //     window.addEventListener("scroll", handleDetectSticky, false)
  //     return () => {
  //       window.removeEventListener("scroll", handleDetectSticky, false)
  //     }
  //   }
  // }, [isLandscape, stickyTop])

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
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap="2rem" sx={{ pb: "3.2rem" }}>
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

        <Stack direction="row" gap="1.6rem" id="canvas-badge-filter">
          <SearchInput dark top={stickyTop} sticky={isSticky} value={searchInput} onChange={handleChangeKeyword}></SearchInput>
          <Select
            top={stickyTop}
            sticky={isSticky}
            value={searchParams.sort}
            onChange={value => handleChangeSelect(value, "sort")}
            items={SORT_LIST}
          ></Select>
          <Select
            top={stickyTop}
            sticky={isSticky}
            value={searchParams.category}
            onChange={value => handleChangeSelect(value, "category")}
            items={CATEGORY_LIST}
          ></Select>
        </Stack>
      </Stack>
      <BadgeList searchParams={searchParams} onAddPage={handleChangePage}></BadgeList>
    </SectionWrapper>
  )
}

export default Badges
