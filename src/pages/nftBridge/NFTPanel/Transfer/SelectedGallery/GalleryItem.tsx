import { Box, Card, CardContent, CardMedia, IconButton, InputBase, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CloseIconSvg } from "@/assets/svgs/close.svg"
import EmptyImg from "@/assets/svgs/empty-img.svg"
import { TOEKN_TYPE } from "@/constants"
import useNFTBridgeStore from "@/stores/nftBridgeStore"

const GalleryItem = props => {
  const { id, image, name, amount, transferAmount } = props

  const { contract, toggleSelectedTokens, updateTransferAmount } = useNFTBridgeStore()

  const handleRemoveSelectedId = () => {
    toggleSelectedTokens(id)
  }

  const handleChangeTransferAmount = e => {
    updateTransferAmount(id, e.target.value)
  }

  return (
    <Card
      sx={{
        position: "relative",
        height: "min-content",
        overflow: "visible",
        "*": {
          cursor: "inherit",
        },
      }}
    >
      <CardMedia sx={{ aspectRatio: "1", bgcolor: "#d9d9d9" }} image={image || EmptyImg} title={id} />
      <CardContent
        sx={{
          p: "0.5rem 0.6rem 0.9rem",
          "&:last-child": {
            pb: "0.9rem",
          },
        }}
      >
        <Typography>{`#${id}` || name}</Typography>
        {contract.type === TOEKN_TYPE[1155] && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <Typography sx={{ fontSize: "1rem" }}>Amount:</Typography>
              <InputBase
                sx={{ bgcolor: "#e0e0e0", fontSize: "1rem", borderRadius: "0.6rem", width: "3rem", height: "2rem", px: "8px" }}
                value={transferAmount}
                onChange={handleChangeTransferAmount}
              ></InputBase>
              <Typography sx={{ fontSize: "1rem" }}>/ {amount}</Typography>
            </Stack>
          </Box>
        )}
      </CardContent>
      <IconButton sx={{ position: "absolute", top: "-0.4rem", right: "-0.4rem", padding: 0 }} onClick={handleRemoveSelectedId}>
        <SvgIcon viewBox="0 0 16 16" component={CloseIconSvg}></SvgIcon>
      </IconButton>
    </Card>
  )
}

export default GalleryItem
