import { useState } from "react"
import useSWR from "swr"

import { Alert, Snackbar } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ecosystemListHashUrl, ecosystemListLogoUrl } from "@/apis/ecosystem"
import LoadingPage from "@/components/LoadingPage"

import GalleryItem from "./GalleryItem"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: max-content;
  margin: 8rem auto;
  grid-auto-columns: 1fr;
  ${theme.breakpoints.down("lg")} {
    grid-template-columns: repeat(2, 1fr);
    width: max-content;
    margin: 4rem auto;
  };
  ${theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 2.4rem auto;
  };
`,
)

const Gallery = () => {
  const [errorMsg, setErrorMsg] = useState("")
  const { data: ecosystemList, isLoading } = useSWR(ecosystemListHashUrl, url => {
    return scrollRequest(url).catch(() => {
      setErrorMsg("Fail to fetch ecosystem list")
      return null
    })
  })

  const handleClose = () => {
    setErrorMsg("")
  }
  return (
    <>
      {isLoading ? (
        <LoadingPage height="60vh"></LoadingPage>
      ) : (
        <Container>
          {ecosystemList?.map(item => (
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
