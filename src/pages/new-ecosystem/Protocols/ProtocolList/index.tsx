import { useEffect, useMemo, useState } from "react"
import { usePrevious } from "react-use"
import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import { ecosystemListUrl } from "@/apis/ecosystem"
import Link from "@/components/Link"
import LoadingPage from "@/components/LoadingPage"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import RequestWarning from "@/components/RequestWarning"
import { DIVERGENT_CATEGORY_MAP, ECOSYSTEM_NETWORK_LIST } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import { isAboveScreen } from "@/utils"

import ProtocolCard from "./ProtocolCard"

const useStyles = makeStyles()(theme => ({
  listRoot: {
    gridRow: "2 / 3",
    gridColumn: "2 / 4",
    paddingRight: "0.8rem",

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(209, 205, 204, 0.30)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    // Firefox
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(209, 205, 204, 0.30) transparent",

    [theme.breakpoints.down("md")]: {
      gridRow: "3 / 4",
      gridColumn: "1 / 3",
    },

    "& > *:nth-child(n+2)": {
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
  const [errorMsg, setErrorMsg] = useState("")
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
    setLoading(true)
    scrollRequest(`${ecosystemListUrl}${queryStr}`)
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
      })
      .catch(() => {
        setErrorMsg("Fail to fetch ecosystem list")
        return null
      })
      .finally(() => {
        setLoading(false)
      })
  }, [queryStr])

  const filteredEcosystemList = useMemo(() => {
    if (category === "All categories") {
      return ecosystemList
    }
    return ecosystemList.filter((item: any) => item.tags.some(item => DIVERGENT_CATEGORY_MAP[category]?.includes(item)))
  }, [ecosystemList, category])

  const handleClose = () => {
    setErrorMsg("")
  }

  return (
    <>
      {loading && !ecosystemList.length ? (
        <LoadingPage></LoadingPage>
      ) : (
        <>
          <SuccessionToView className={classes.listRoot} threshold={isMobile ? 0 : 1} animate="show">
            {filteredEcosystemList?.map((item: any) => (
              <SuccessionItem>
                <ProtocolCard key={item.name} {...item}></ProtocolCard>
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
      )}

      <RequestWarning open={!!errorMsg} onClose={handleClose}>
        {errorMsg}
      </RequestWarning>
    </>
  )
}
export default ProtocolList
