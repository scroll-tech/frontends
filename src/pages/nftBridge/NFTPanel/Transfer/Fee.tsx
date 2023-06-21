import { useMemo } from "react"

import { Stack, Typography } from "@mui/material"

import { ETH_SYMBOL } from "@/constants"
import useGasFee from "@/hooks/useGasFee"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { toTokenDisplay } from "@/utils"

const Fee = () => {
  const { gasFee } = useGasFee()
  const { selectedList } = useNFTBridgeStore()
  const formattedGasFee = useMemo(() => {
    if (!selectedList.length) {
      return "-"
    }
    return toTokenDisplay(gasFee, undefined, ETH_SYMBOL)
  }, [gasFee, selectedList])
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography variant="body2" color="secondary">
        Fees
      </Typography>
      <Typography variant="body2" color="secondary">
        {formattedGasFee}
      </Typography>
    </Stack>
  )
}

export default Fee
