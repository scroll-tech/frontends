import { Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { LIST_YOUR_DAPP_LINK } from "@/constants"

const Header = () => {
  return (
    <Container sx={{ py: "15.4rem", display: "flex", justifyContent: "space-between", maxWidth: "1438px !important" }}>
      <Typography sx={{ fontSize: "7.8rem", lineHeight: "8.5rem", fontWeight: 600, width: "min-content" }}>Scroll Ecosystem</Typography>
      <Stack direction="column" justifyContent="space-between" sx={{ pb: "1.5rem" }}>
        <Typography sx={{ fontSize: "2.6rem", lineHeight: "normal" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br></br>Proin ut iaculis quam mollis consequat.
        </Typography>
        <Button href={LIST_YOUR_DAPP_LINK} target="_blank">
          List Your dapp
        </Button>
      </Stack>
    </Container>
  )
}

export default Header
