import { Box, Typography } from "@mui/material"

import Link from "@/components/Link"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

import Modal from "../../components/Modal"

const ApproveLoading = props => {
  const { open, onClose } = props
  const { walletName } = useWeb3Context()

  return (
    <Modal open={open} title=" Waiting for Approval" variant="loading" onClose={onClose}>
      <Link>Not responding? Click here for help</Link>
      <Box sx={{ p: ["0.8rem 4.2rem 4rem", "0.8rem 6.2rem 5rem"], mt: "2rem" }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Allow Scroll to bridge any your NFTs in the contract
        </Typography>
        <Typography variant="body1">Approve on your {walletName} wallet</Typography>
      </Box>
    </Modal>
  )
}

export default ApproveLoading
