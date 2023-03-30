import { Stack, Typography } from "@mui/material"

import { useNFTBridgeContext } from "@/contexts/NFTBridgeProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

const Fee = () => {
  const { walletCurrentAddress, provider } = useWeb3Context()
  const { tokenInstance } = useNFTBridgeContext()
  const getGasLimit = async () => {
    const transactionObject = await tokenInstance.populateTransaction.transferFrom(walletCurrentAddress, walletCurrentAddress, 1364061)
    const signer = provider?.getSigner(0)
    const gasLimit = await signer?.estimateGas(transactionObject)
    console.log(gasLimit?.toNumber(), "gasLimit")
  }
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography variant="body2" color="secondary" onClick={getGasLimit}>
        Fees
      </Typography>
      <Typography variant="body2" color="secondary">
        0.003ETH
      </Typography>
    </Stack>
  )
}

export default Fee
