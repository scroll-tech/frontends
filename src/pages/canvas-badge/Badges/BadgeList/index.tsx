import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePrevious } from "react-use"
import "react-virtualized/styles.css"

import { Box, Button, CircularProgress, SvgIcon } from "@mui/material"

import { fetchBadgesURL } from "@/apis/canvas-badge"
import { ReactComponent as ArrowDownSvg } from "@/assets/svgs/canvas-badge/arrow-down.svg"
import LoadingButton from "@/components/LoadingButton"
import LoadingPage from "@/components/LoadingPage"
import { CANVAS_AND_BADGES_PAGE_SYMBOL, CATEGORY_LIST, SORT_LIST } from "@/constants"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { checkIfHasBadgeByAddress } from "@/services/canvasService"
import { isAboveScreen } from "@/utils/dom"

import BadgeCard from "./BadgeCard"
import BadgeMasonry from "./BadgeMasonry"
import Error from "./Error"
import NoData from "./NoData"

const PAGE_SIZE = 20

const BadgeList = props => {
  const { walletCurrentAddress, chainId, provider } = useRainbowContext()
  const isL2 = useMemo(() => chainId === CHAIN_ID.L2, [chainId])
  const {
    searchParams: { category, sort, keyword, page },
    onAddPage,
    ...restProps
  } = props
  const navigate = useNavigate()
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
  const setBadgesMintStatus = function (data) {
    if (provider && isL2) {
      data.forEach((badge, index) => {
        checkIfHasBadgeByAddress(provider, walletCurrentAddress, badge.badgeContract).then(mintStatus => {
          data[index].minted = mintStatus
        })
      })
    }
  }
  useEffect(() => {
    fetchBadgeList(`${queryStr}&page_size=${PAGE_SIZE}`)
  }, [queryStr, provider, walletCurrentAddress])
  const fetchBadgeList = value => {
    setLoading(true)
    scrollRequest(`${fetchBadgesURL}${value}`)
      .then(({ data, total }) => {
        setHasMore((page - 1) * PAGE_SIZE + data.length < total)
        setBadgesMintStatus(data)
        if (prePage && page - prePage === 1) {
          setBadgeList(pre => pre.concat(data))
        } else {
          const anchorEl = document.getElementById(`${CANVAS_AND_BADGES_PAGE_SYMBOL}-discover`)
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
    fetchBadgeList(`${queryStr}&page_size=${PAGE_SIZE}`)
  }

  const handleClickBadge = ({ badgeContract }) => {
    navigate(`/canvas/badge-contract/${badgeContract}`)
  }

  if (loading && !badgeList.length) {
    return <LoadingPage height="26rem" {...restProps}></LoadingPage>
  } else if (isError && !badgeList.length) {
    return (
      <Error
        dark
        sx={{ height: "26rem" }}
        title="Oops! Something went wrong"
        action={
          <LoadingButton loading={loading} onClick={handleReQuest}>
            Try again
          </LoadingButton>
        }
        {...restProps}
      ></Error>
    )
  } else if (!badgeList.length) {
    return (
      <NoData
        dark
        sx={{ height: "26rem" }}
        title="No matches found"
        description="Please change your key words and search again"
        {...restProps}
      ></NoData>
    )
  }

  return (
    <Box {...restProps}>
      <BadgeMasonry data={badgeList} ItemComponent={BadgeCard} onItemClick={handleClickBadge}></BadgeMasonry>

      {hasMore && (
        <Box sx={{ textAlign: "center", mt: "1.6rem" }}>
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
            endIcon={
              loading ? (
                <CircularProgress sx={{ color: "inherit" }} size={18} thickness={4} />
              ) : (
                <SvgIcon component={ArrowDownSvg} sx={{ fontSize: "1.6rem !important", width: "1.8rem" }} inheritViewBox></SvgIcon>
              )
            }
          >
            Load more
          </Button>
        </Box>
      )}
    </Box>
  )
}
export default BadgeList
