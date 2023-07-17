import { useEffect, useMemo, useState } from "react"

import { Alert, Box, Link, Snackbar } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ecosystemListHashUrl } from "@/apis/ecosystem"
import LoadingPage from "@/components/LoadingPage"
import { DIVERGENT_CATEGORY_MAP } from "@/constants"

import GalleryItem from "./GalleryItem"

const Grid = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: max-content;
  margin: 3rem auto;
  grid-auto-columns: 1fr;
  grid-gap: 3rem;
  ${theme.breakpoints.down("lg")} {
    grid-template-columns: repeat(3, 1fr);
  };
  ${theme.breakpoints.down("md")} {
    grid-template-columns: repeat(2, 1fr);
  };
  ${theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
    width: 100%;
    grid-gap: 2rem;
  };
`,
)

const Gallery = props => {
  const { selectedCategory } = props

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
          <Grid>
            {filteredEcosystemList?.map((item: any) => (
              <GalleryItem key={item.name} item={item}></GalleryItem>
            ))}
          </Grid>
          {hasMore && (
            <Box sx={{ textAlign: "center", mt: ["5.5rem", "12.5rem"] }}>
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
