import { Box, Typography } from "@mui/material"

import Link from "@/components/Link"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useNFTBridgeStore from "@/stores/nftBridgeStore"

import Modal from "../../components/Modal"

const SendLoading = props => {
  const { open, onClose } = props
  const { walletName } = useWeb3Context()
  const { fromNetwork, toNetwork } = useNFTBridgeStore()

  return (
    <Modal open={open} title="Waiting for Confirmation" variant="loading" onClose={onClose}>
      <Link>Not responding? Click here for help</Link>
      <Box sx={{ p: ["0.8rem 4.2rem 4rem", "0.8rem 6.2rem 5rem"], mt: "2rem" }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Bridging your NFTs from {fromNetwork.name} to {toNetwork.name}
        </Typography>
        <Typography variant="body1">Confirm this transaction on your {walletName} wallet</Typography>
      </Box>
    </Modal>
  )
}

export default SendLoading
