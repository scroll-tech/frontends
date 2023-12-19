import { useEffect, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, List } from "@mui/material"

import { ecosystemListUrl } from "@/apis/ecosystem"
import Link from "@/components/Link"
import LoadingPage from "@/components/LoadingPage"
import RequestWarning from "@/components/RequestWarning"
import { DIVERGENT_CATEGORY_MAP, ECOSYSTEM_NETWORK_LIST } from "@/constants"

import ProtocolCard from "./ProtocolCard"

const useStyles = makeStyles()(theme => ({
  listRoot: {
    gridRow: "2 / 3",
    gridColumn: "2 / 4",
    [theme.breakpoints.down("md")]: {
      gridRow: "3 / 4",
      gridColumn: "1 / 3",
    },
  },
  listItemRoot: {
    gap: "2.4rem",
    backgroundColor: theme.palette.themeBackground.normal,
    padding: "2.4rem",
    borderRadius: "2rem",
    "&:nth-child(n+2)": {
      marginTop: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "1.6rem",
    },
  },
  listItemTextSecondary: {
    fontSize: "1.6rem",
    lineHeight: 1.5,
    marginTop: "1.2rem",
    maxWidth: "72rem",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    color: "#5b5b5b",
  },
}))

const ProtocolList = props => {
  const {
    searchParams: { category, network, keyword },
  } = props
  const { classes } = useStyles()

  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
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
      searchParams.set("keyword", keyword)
    }
    const searchParamsStr = searchParams.toString()
    return searchParamsStr ? `?${searchParamsStr}` : ""
  }, [category, network, keyword, page])

  useEffect(() => {
    setLoading(true)
    scrollRequest(`${ecosystemListUrl}${queryStr}`)
      .then(({ data, hasMore }) => {
        setHasMore(hasMore)
        setEcosystemList(pre => pre.concat(data))
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

  const handleLoadNextPage = () => {
    setPage(pre => pre + 1)
  }
  return (
    <>
      {loading && !ecosystemList.length ? (
        <LoadingPage></LoadingPage>
      ) : (
        <>
          <List classes={{ root: classes.listRoot }}>
            {filteredEcosystemList?.map((item: any) => (
              <ProtocolCard key={item.name} {...item}></ProtocolCard>
            ))}
          </List>
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
                onClick={handleLoadNextPage}
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
