import { Container, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"

import useCheckViewport from "@/hooks/useCheckViewport"

const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.between("md", "lg")]: {
    width: "50%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "max-content",
  },
}))

const StepWrapper = props => {
  const { src, children } = props

  const { isPortrait } = useCheckViewport()

  return (
    <Container sx={{ pt: "12rem", pb: ["8rem", "16rem"] }}>
      <Stack direction={isPortrait ? "column" : "row"} alignItems={isPortrait ? "center" : "flex-start"} sx={{ gap: ["1.6rem", "8rem", "3.25rem"] }}>
        {children}

        <Img src={src} alt="illustration"></Img>
      </Stack>
    </Container>
  )
}
export default StepWrapper
