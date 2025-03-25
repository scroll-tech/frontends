import { Box, Container, Stack, Typography } from "@mui/material"

import Support from "@/assets/svgs/footer/support.svg"
import Button from "@/components/Button"
import { GET_IN_TOUCH_URL } from "@/constants/link"

const NeedSupport = () => {
  return (
    <Box
      sx={{
        backgroundColor: "themeBackground.highlight",
        py: ["4rem", "4rem", "3.2rem"],
      }}
    >
      <Container>
        <Stack direction={["column", "row"]} sx={{ alignItems: ["flex-start", "center"], gap: "2.4rem" }}>
          <Stack
            sx={{
              width: ["4.8rem", "7rem"],
              aspectRatio: "1/1",
              backgroundColor: "themeBackground.dark",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Support className="w-[32px] sm:w-[36px] h-auto"></Support>
          </Stack>
          <Typography sx={{ typography: "title", fontSize: ["2rem", "2.4rem"], flex: 1 }}>Built a project and need more support?</Typography>
          <Button href={GET_IN_TOUCH_URL} className="!w-[240px] md:!w-[250px]" whiteButton target="_blank">
            Get in touch
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default NeedSupport
