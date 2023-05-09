import { useMemo, useState } from "react"
import useSWR from "swr"

import { Alert, Snackbar } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ecosystemListHashUrl, ecosystemListLogoUrl } from "@/apis/ecosystem"
import LoadingPage from "@/components/LoadingPage"
import { DIVERGENT_CATEGORY_MAP } from "@/constants"

import GalleryItem from "./GalleryItem"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: max-content;
  margin: 3rem auto 8rem;
  grid-auto-columns: 1fr;
  ${theme.breakpoints.down("lg")} {
    grid-template-columns: repeat(2, 1fr);
    width: max-content;
    margin: 2rem auto 4rem;
  };
  ${theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 2rem auto 2.4rem;
  };
`,
)

const Gallery = props => {
  const { selectedCategory } = props

  const [errorMsg, setErrorMsg] = useState("")
  const { data: ecosystemList, isLoading } = useSWR(ecosystemListHashUrl, url => {
    return scrollRequest(url).catch(() => {
      setErrorMsg("Fail to fetch ecosystem list")
      return null
    })
  })

  const filteredEcosystemList = useMemo(() => {
    if (selectedCategory === "All") {
      return ecosystemList
    }
    return ecosystemList.filter(item => item.tags.some(item => DIVERGENT_CATEGORY_MAP[selectedCategory].includes(item)))
  }, [ecosystemList, selectedCategory])

  const handleClose = () => {
    setErrorMsg("")
  }
  return (
    <>
      {isLoading ? (
        <LoadingPage height="60vh"></LoadingPage>
      ) : (
        <Container>
          {filteredEcosystemList?.map(item => (
            <GalleryItem key={item.name} logoBaseUrl={ecosystemListLogoUrl} item={item}></GalleryItem>
          ))}
          <Snackbar open={!!errorMsg} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error" onClose={handleClose}>
              {errorMsg}
            </Alert>
          </Snackbar>
        </Container>
      )}
    </>
  )
}

export default Gallery
