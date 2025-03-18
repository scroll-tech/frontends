import { Box, Container, Stack, Typography } from "@mui/material"

import Support from "@/assets/svgs/footer/support.svg"
import Button from "@/components/Button"
import { GET_IN_TOUCH_URL } from "@/constants/link"

const NeedSupport = () => {
  return (
    <Box
      sx={{
        backgroundColor: "themeBackground.highlight",
        py: ["6rem", "6rem", "3.2rem"],
      }}
    >
      <Container>
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Support></Support>
          <Typography sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, flex: 1, ml: "2.4rem" }}>
            Built a project and need more support?
          </Typography>
          <Button href={GET_IN_TOUCH_URL} whiteButton target="_blank">
            Get in touch
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default NeedSupport
