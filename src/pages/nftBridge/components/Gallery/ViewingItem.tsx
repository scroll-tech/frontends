import { Box, Card, CardContent, CardMedia, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CheckIconSvg } from "@/assets/svgs/check.svg"
import EmptyImg from "@/assets/svgs/empty-img.svg"
import { TOEKN_TYPE } from "@/constants"
import useNFTBridgeStore from "@/stores/nftBridgeStore"

const GalleryItem = props => {
  const { id, image, name, amount } = props

  const { contract, toggleSelectedList } = useNFTBridgeStore()
  const selectedTokenIds = useNFTBridgeStore(state => state.selectedTokenIds())

  const handleToggleSelect = () => {
    toggleSelectedList(id)
  }

  return (
    <Card
      sx={{
        position: "relative",
        cursor: "pointer",
        height: "min-content",
        "*": {
          cursor: "inherit",
        },
      }}
      onClick={handleToggleSelect}
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
              <Typography sx={{ fontSize: "1rem", lineHeight: 1 }}>Amount:</Typography>
              <Typography sx={{ fontSize: "1rem", lineHeight: 1 }}>{amount}</Typography>
            </Stack>
          </Box>
        )}
      </CardContent>
      {selectedTokenIds.includes(id) && (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#0E6C37A0",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgIcon sx={{ fontSize: "5rem" }} viewBox="0 0 50 50" component={CheckIconSvg}></SvgIcon>
        </Box>
      )}
    </Card>
  )
}

export default GalleryItem
