import { useEffect, useMemo, useState } from "react"
import { usePrevious } from "react-use"
import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import { ecosystemListUrl } from "@/apis/ecosystem"
import Link from "@/components/Link"
import LoadingButton from "@/components/LoadingButton"
import LoadingPage from "@/components/LoadingPage"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import { ECOSYSTEM_NETWORK_LIST } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import { isAboveScreen } from "@/utils/dom"

import Error from "./Error"
import NoData from "./NoData"
import ProtocolCard from "./ProtocolCard"

const useStyles = makeStyles()(theme => ({
  listRoot: {
    gridRow: "2 / 3",
    gridColumn: "2 / 4",

    [theme.breakpoints.down("md")]: {
      gridRow: "3 / 4",
      gridColumn: "1 / 3",
    },

    "& > *:nth-of-type(n+2)": {
      marginTop: "2rem",
    },
  },
}))

const ProtocolList = props => {
  const {
    searchParams: { category, network, keyword, page },
    onAddPage,
  } = props
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()

  const [loading, setLoading] = useState(false)
  const prePage = usePrevious(page)
  const [ecosystemList, setEcosystemList] = useState([])
  const [isError, setIsError] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const queryStr = useMemo(() => {
    const searchParams = new URLSearchParams({
      page,
    } as any)
    if (network !== ECOSYSTEM_NETWORK_LIST[0]) {
      searchParams.set("network", network)
    }
    if (category !== "All categories") {
      searchParams.set("category", category)
    }
    if (keyword.trim()) {
      searchParams.set("query", keyword)
    }
    const searchParamsStr = searchParams.toString()
    return searchParamsStr ? `?${searchParamsStr}` : ""
  }, [category, network, keyword, page])

  useEffect(() => {
    fetchEcosystemList(queryStr)
  }, [queryStr])

  const fetchEcosystemList = value => {
    setLoading(true)
    scrollRequest(`${ecosystemListUrl}${value}`)
      .then(({ data, hasMore }) => {
        setHasMore(hasMore)
        if (prePage && page - prePage === 1) {
          setEcosystemList(pre => pre.concat(data))
        } else {
          const anchorEl = document.querySelector(".ecosystem-protocols-title")
          if (isAboveScreen(anchorEl)) {
            anchorEl?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          setEcosystemList(data)
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
    fetchEcosystemList(queryStr)
  }

  const renderList = () => {
    if (loading && !ecosystemList.length) {
      return <LoadingPage height="26rem" sx={{ gridColumn: ["1 / 3", "1 / 3", "2 / 4"] }}></LoadingPage>
    } else if (isError && !ecosystemList.length) {
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
    } else if (!ecosystemList.length) {
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
        <SuccessionToView className={classes.listRoot} threshold={isMobile ? 0 : 1} animate="show">
          {ecosystemList?.map((item: any) => (
            <SuccessionItem key={item.name}>
              <ProtocolCard {...item}></ProtocolCard>
            </SuccessionItem>
          ))}
        </SuccessionToView>

        {hasMore && (
          <Box sx={{ gridColumn: ["1 / 3", "1 / 3", "2 / 4"], textAlign: "center", mt: "1.6rem" }}>
            <Link
              underline="always"
              component="button"
              sx={{
                fontSize: "1.6rem",
                fontWeight: 400,
                color: "#5b5b5b",
                "&:hover": {
                  color: "#4F4F4F",
                },
              }}
              onClick={onAddPage}
            >
              Load more
            </Link>
          </Box>
        )}
      </>
    )
  }

  return <>{renderList()}</>
}
export default ProtocolList
