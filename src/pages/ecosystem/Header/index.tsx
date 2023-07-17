import { isMobileOnly } from "react-device-detect"

import { Box, Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { LIST_YOUR_DAPP_LINK } from "@/constants"

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.themeBackground.light,
      }}
    >
      <Container
        sx={{
          pt: ["7.3rem", "15.4rem"],
          pb: ["4rem", "15.4rem"],
          display: "flex",
          flexDirection: ["column", "row"],
          justifyContent: "space-between",
          maxWidth: "1438px !important",
        }}
      >
        <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: ["5rem", "8.5rem"], fontWeight: 600, width: "min-content" }}>
          Scroll Ecosystem
        </Typography>
        <Stack direction="column" justifyContent="space-between" sx={{ pb: [0, "1.5rem"], maxWidth: ["100%", "68rem"] }}>
          <Typography sx={{ fontSize: ["2rem", "2.6rem"], lineHeight: "normal", mt: ["2rem", 0], mb: ["3.8rem", 0] }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut iaculis quam mollis consequat.
          </Typography>
          <Stack direction="row" spacing={isMobileOnly ? "2rem" : "3rem"}>
            <Button href="/bridge" color="primary">
              Bridge into Scroll
            </Button>
            <Button href={LIST_YOUR_DAPP_LINK} target="_blank">
              List Your dapp
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Box
        sx={{
          borderRadius: "4rem 4rem 0 0",
          height: ["50.8rem", "37rem"],
          background: theme => `no-repeat bottom center ${theme.palette.themeBackground.light} url(/imgs/ecosystem/ecosystem-bg.png)`,
          backgroundSize: "cover",
        }}
      ></Box>
    </Box>
  )
}

export default Header
