// import { Alert, Snackbar } from "@mui/material"
import { Container } from "@mui/system"

import NFTSelect from "./NFTSelect"
import Transfer from "./Transfer"

const NFTPanel = () => {
  return (
    <Container sx={{ display: "flex", gap: "1rem", mt: "3rem" }}>
      <NFTSelect></NFTSelect>
      <Transfer></Transfer>
    </Container>
  )
}

export default NFTPanel
