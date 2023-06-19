import { useEffect, useMemo, useState } from "react"

import { Alert, Box, Snackbar } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ecosystemListHashUrl } from "@/apis/ecosystem"
import LoadingButton from "@/components/LoadingButton"
import LoadingPage from "@/components/LoadingPage"
import { DIVERGENT_CATEGORY_MAP } from "@/constants"

import GalleryItem from "./GalleryItem"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: max-content;
  margin: 3rem auto;
  grid-auto-columns: 1fr;
  ${theme.breakpoints.down("lg")} {
    grid-template-columns: repeat(2, 1fr);
    width: max-content;
    margin: 2rem auto;
  };
  ${theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 2rem auto;
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

  // TODO: for test, remove later
  // const hasMore = true
  // useEffect(() => {
  //   if ((ecosystemList.slice(-1)[0] as any)?.isLastOne) {
  //     setPage(1)
  //   }
  // }, [ecosystemList])

  const hasMore = useMemo(() => {
    if (!ecosystemList.length) {
      return false
    }
    const lastOne: any = ecosystemList.slice(-1)[0]
    return !lastOne.isLastOne
  }, [ecosystemList])

  const filteredEcosystemList = useMemo(() => {
    if (selectedCategory === "All") {
      return ecosystemList
    }
    return ecosystemList.filter((item: any) => item.tags.some(item => DIVERGENT_CATEGORY_MAP[selectedCategory].includes(item)))
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
          <Container>
            {filteredEcosystemList?.map((item: any) => (
              <GalleryItem key={item.name} item={item}></GalleryItem>
            ))}
            <Snackbar open={!!errorMsg} autoHideDuration={6000} onClose={handleClose}>
              <Alert severity="error" onClose={handleClose}>
                {errorMsg}
              </Alert>
            </Snackbar>
          </Container>
          {hasMore && (
            <Box sx={{ textAlign: "center", mb: ["2rem", "3rem", "5rem"] }}>
              <LoadingButton sx={{ width: "20rem" }} variant="contained" loading={loading && page > 1} onClick={handleLoadNextPage}>
                Load More
              </LoadingButton>
            </Box>
          )}
        </>
      )}
    </>
  )
}

export default Gallery
