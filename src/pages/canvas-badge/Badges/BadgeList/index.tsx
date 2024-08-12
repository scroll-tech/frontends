import { useEffect, useMemo, useState } from "react"
import { usePrevious } from "react-use"
import "react-virtualized/styles.css"

import { Box, Button, SvgIcon } from "@mui/material"

import { fetchBadgesURL } from "@/apis/canvas-badge"
import { ReactComponent as ArrowDownSvg } from "@/assets/svgs/canvas-badge/arrow-down.svg"
import LoadingButton from "@/components/LoadingButton"
import LoadingPage from "@/components/LoadingPage"
import { CATEGORY_LIST, SORT_LIST } from "@/constants"
import { isAboveScreen } from "@/utils/dom"

import BadgeCard from "./BadgeCard"
import Error from "./Error"
import Masonry from "./Masonry"
import NoData from "./NoData"

const BadgeList = props => {
  const {
    searchParams: { category, sort, keyword, page },
    onAddPage,
  } = props
  const [loading, setLoading] = useState(false)
  const prePage = usePrevious(page)
  const [badgeList, setBadgeList] = useState([])
  const [isError, setIsError] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const queryStr = useMemo(() => {
    const searchParams = new URLSearchParams({
      page_number: page,
    } as any)
    if (sort !== SORT_LIST[0]) {
      searchParams.set("sort", sort)
    }
    if (category !== CATEGORY_LIST[0]) {
      searchParams.set("category", category)
    }
    if (keyword.trim()) {
      searchParams.set("query", keyword)
    }
    const searchParamsStr = searchParams.toString()
    return searchParamsStr ? `?${searchParamsStr}` : ""
  }, [category, sort, keyword, page])

  useEffect(() => {
    fetchBadgeList(queryStr + "&page_size=20")
  }, [queryStr])

  const fetchBadgeList = value => {
    setLoading(true)
    scrollRequest(`${fetchBadgesURL}${value}`)
      .then(({ data, hasMore }) => {
        setHasMore(hasMore)
        if (prePage && page - prePage === 1) {
          setBadgeList(pre => pre.concat(data))
        } else {
          const anchorEl = document.querySelector(".canvas-badge-title")
          if (isAboveScreen(anchorEl)) {
            anchorEl?.scrollIntoView({ behavior: "smooth" })
          }
          setBadgeList(data)
        }
        setIsError(false)
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleReQuest = () => {
    fetchBadgeList(queryStr)
  }

  const renderList = () => {
    if (loading && !badgeList.length) {
      return <LoadingPage height="26rem" sx={{ gridColumn: ["1 / 3", "1 / 3", "2 / 4"] }}></LoadingPage>
    } else if (isError && !badgeList.length) {
      return (
        <Error
          sx={{ height: "26rem", gridColumn: ["1 / 3", "1 / 3", "2 / 4"] }}
          title="Oops! Something went wrong"
          action={
            <LoadingButton loading={loading} onClick={handleReQuest}>
              Try again
            </LoadingButton>
          }
        ></Error>
      )
    } else if (!badgeList.length) {
      return (
        <NoData
          sx={{ height: "26rem", gridColumn: ["1 / 3", "1 / 3", "2 / 4"] }}
          title="No matches found"
          description="Please change your key words and search again"
        ></NoData>
      )
    }

    return (
      <>
        <Masonry data={badgeList} ItemComponent={BadgeCard}></Masonry>

        {!hasMore && (
          <Box sx={{ gridColumn: ["1 / 3", "1 / 3", "2 / 4"], textAlign: "center", mt: "1.6rem" }}>
            <Button
              variant="contained"
              sx={{
                width: "15.2rem",
                fontSize: "1.6rem",
                fontWeight: 600,
                backgroundColor: "themeBackground.tag",
                color: "background.default",
                px: "2.4rem",
                "&:hover": {
                  backgroundColor: "themeBackground.tag",
                },
              }}
              onClick={onAddPage}
              endIcon={<SvgIcon component={ArrowDownSvg} sx={{ fontSize: "1.6rem !important" }} inheritViewBox></SvgIcon>}
            >
              Load more
            </Button>
          </Box>
        )}
      </>
    )
  }

  return <>{renderList()}</>
}
export default BadgeList
