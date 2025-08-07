import { Box, Container, Stack, Typography } from "@mui/material"

import MobileHeroBg from "@/assets/images/sessions/hero-bg-mobile.svg?url"
import HeroBg from "@/assets/images/sessions/hero-bg.svg?url"

import TotalMarks from "./TotalMarks"

const Header = () => {
  return (
    <Box
      sx={[
        {
          position: "relative",
          height: ["124rem", "75rem", "auto"],
          background: [`url(${MobileHeroBg.src}) bottom / contain no-repeat`, `url(${HeroBg.src}) bottom / contain no-repeat`],
          aspectRatio: ["auto", "auto", "16 / 9"],
          marginTop: [0, 0, "-6.5rem"],
        },
      ]}
    >
      <Container>
        <Stack
          direction={["column", "column", "row"]}
          justifyContent="space-between"
          alignItems={["center", "center", "flex-start"]}
          sx={{ pt: ["3.4rem", "5rem", "13rem"], px: ["2rem", "2rem", "6rem"], gap: ["3.2rem", "3.2rem", "3.2rem", "unset"] }}
        >
          <Typography
            sx={{
              fontSize: ["4rem", "6.4rem"],
              lineHeight: ["4.8rem", "8.8rem"],
              fontWeight: 600,
            }}
          >
            Scroll Sessions
          </Typography>
          <TotalMarks></TotalMarks>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
