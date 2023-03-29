import { Box, Divider, Stack, Typography } from "@mui/material"

import Button from "../../components/Button"
import NetworkSelect from "../../components/NetworkSelect"
import Fee from "./Fee"
import SelectedGallery from "./SelectedGallery"

const Transfer = props => {
  const { network } = props

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: "6px", flex: 1, p: "5rem 3rem 3rem", display: "flex", flexDirection: "column" }}>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 400, whiteSpace: "nowrap" }}>
          Transfer to
        </Typography>
        <NetworkSelect value={network.chainId} options={[network]} disabled></NetworkSelect>
      </Stack>
      <Divider sx={{ my: "2.5rem", mx: "2rem", width: "calc(100% - 4rem)" }}></Divider>
      <Typography variant="h6" color="secondary" sx={{ fontWeight: 400, lineHeight: 1 }}>
        Selected NFTs
      </Typography>
      <SelectedGallery sx={{ mt: "1.6rem", flex: 1 }}></SelectedGallery>
      <Divider sx={{ my: "2.5rem", mx: "2rem", width: "calc(100% - 4rem)" }}></Divider>
      <Fee></Fee>
      <Stack direction="row" sx={{ width: "100%", justifyContent: "center", mt: "2rem" }}>
        <Button sx={{ width: "20rem" }}>APPROVE</Button>
      </Stack>
    </Box>
  )
}

export default Transfer
