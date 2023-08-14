import { useMemo } from "react"
import useStorage from "squirrel-gill"

import { Alert, Box, Typography } from "@mui/material"

import TextButton from "@/components/TextButton"
import { ETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import useBridgeStore from "@/stores/bridgeStore"

const TxSuccess = () => {
  const { fromNetwork, txResult, changeTxResult } = useBridgeStore()
  const [tokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)

  const transactionUrl = useMemo(() => `${fromNetwork.explorer}/tx/${txResult?.hash}`, [fromNetwork, txResult])

  // TODO: temporarily
  const handleReturn = () => {
    changeTxResult(null)
  }
  return (
    <Box sx={{ height: "34rem" }}>
      <Alert icon={false} severity="success" sx={{ fontSize: "2.4rem", fontWeight: "600", textAlign: "center" }} onClick={handleReturn}>
        Success!
      </Alert>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "2.5rem" }}>
        Moving {txResult?.amount} {tokenSymbol} to Scroll Mainnet
      </Typography>
      <Typography>...Approximately 20 minutes remaining</Typography>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "4rem" }}>
        This is your tx hash: <Typography sx={{ fontWeight: 400 }}>{txResult?.hash}</Typography>
      </Typography>
      <TextButton sx={{ color: "success.main", fontSize: "1.6rem" }} href={transactionUrl} external>
        Check your transaction in our block explorer
      </TextButton>
    </Box>
  )
}

export default TxSuccess
