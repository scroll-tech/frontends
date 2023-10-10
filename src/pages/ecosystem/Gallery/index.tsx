import { useEffect, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Alert, Box, Link, Snackbar } from "@mui/material"

import { ecosystemListHashUrl } from "@/apis/ecosystem"
import LoadingPage from "@/components/LoadingPage"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import { DIVERGENT_CATEGORY_MAP } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import GalleryItem from "./GalleryItem"

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(30rem, 1fr))",
    width: "100%",
    padding: "3rem 0",
    rowGap: "5rem",
    columnGap: "3rem",

    [theme.breakpoints.down("sm")]: {
      padding: "2rem 0",
      gap: "4rem",
    },
  },
}))

const Gallery = props => {
  const { selectedCategory } = props
  const { classes } = useStyles()

  const { isMobile } = useCheckViewport()

  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [ecosystemList, setEcosystemList] = useState([])
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    setLoading(true)
    scrollRequest(`${ecosystemListHashUrl}ecosystem.hash.p${page}.json`)
      .then(data => {
        setEcosystemList(pre => pre.concat(data))
      })
      .catch(() => {
        setErrorMsg("Fail to fetch ecosystem list")
        return null
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  const hasMore = useMemo(() => {
    if (!ecosystemList.length) {
      return false
    }
    const lastOne: any = ecosystemList.slice(-1)[0]
    return !lastOne.isLastOne
  }, [ecosystemList])

  const filteredEcosystemList = useMemo(() => {
    if (selectedCategory === "All categories") {
      return ecosystemList
    }
    return ecosystemList.filter((item: any) => item.tags.some(item => DIVERGENT_CATEGORY_MAP[selectedCategory]?.includes(item)))
  }, [ecosystemList, selectedCategory])

  const handleClose = () => {
    setErrorMsg("")
  }

  const handleLoadNextPage = () => {
    setPage(pre => pre + 1)
  }
  return (
    <>
      {loading && !ecosystemList.length ? (
        <LoadingPage height="60vh"></LoadingPage>
      ) : (
        <>
          <SuccessionToView className={classes.grid} threshold={isMobile ? 0 : 1} animate="show">
            {filteredEcosystemList?.map((item: any) => (
              <SuccessionItem key={item.name}>
                <GalleryItem item={item}></GalleryItem>
              </SuccessionItem>
            ))}
          </SuccessionToView>
          {hasMore && (
            <Box sx={{ textAlign: "center", mt: ["1.2rem", "1.2rem", "9.5rem"] }}>
              <Link
                component="button"
                sx={{
                  fontSize: ["1.6rem", "2rem"],
                  fontWeight: 500,
                  lineHeight: "normal",
                  color: "#727272",
                  textDecorationColor: "#727272",
                  "&:hover": {
                    color: "#4F4F4F",
                    textDecorationColor: "#4F4F4F",
                  },
                }}
                // loading={loading && page > 1}
                onClick={handleLoadNextPage}
              >
                Load more
              </Link>
            </Box>
          )}
        </>
      )}
      <Snackbar open={!!errorMsg} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Gallery
