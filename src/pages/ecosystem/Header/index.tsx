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
          pt: "15.4rem",
          pb: "15.4rem",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1438px !important",
        }}
      >
        <Typography sx={{ fontSize: "7.8rem", lineHeight: "8.5rem", fontWeight: 600, width: "min-content" }}>Scroll Ecosystem</Typography>
        <Stack direction="column" justifyContent="space-between" sx={{ pb: "1.5rem" }}>
          <Typography sx={{ fontSize: "2.6rem", lineHeight: "normal" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br></br>Proin ut iaculis quam mollis consequat.
          </Typography>
          <Stack direction="row" spacing="3rem">
            <Button target="_blank" color="primary">
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
          height: "37rem",
          background: theme => `no-repeat bottom center ${theme.palette.themeBackground.light} url(/imgs/ecosystem/ecosystem-bg.png)`,
          backgroundSize: "cover",
        }}
      ></Box>
    </Box>
  )
}

export default Header
