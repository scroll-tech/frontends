import { Typography } from "@mui/material"
import { Stack } from "@mui/system"

const PageTitle = () => {
  return (
    <Stack direction="column">
      <Typography variant="h3">NFT Bridge</Typography>
      <Typography variant="body2" color="secondary">
        Transfer your NFTs across different networks
      </Typography>
    </Stack>
  )
}

export default PageTitle
