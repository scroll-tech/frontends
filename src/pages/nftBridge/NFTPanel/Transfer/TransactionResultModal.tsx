import { useMemo } from "react"

import { Button } from "@mui/material"

import Link from "@/components/Link"
import { BLOCK_EXPLORER } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { generateExploreLink } from "@/utils"

import Modal from "../../components/Modal"

const TransactionResultModal = props => {
  const { open, hash, onClose } = props

  const { chainId } = useWeb3Context()

  const txUrl = useMemo(() => {
    if (hash && chainId) {
      const explorer = BLOCK_EXPLORER[chainId]
      return generateExploreLink(explorer, hash)
    }
    return ""
  }, [chainId, hash])

  return (
    <Modal open={open} title="Transaction Submitted" variant="success" onClose={onClose}>
      <Link external href={txUrl}>
        View on block explorer
      </Link>
      <Button variant="contained" sx={{ mt: "4rem", width: "100%" }} onClick={onClose}>
        Close
      </Button>
    </Modal>
  )
}

export default TransactionResultModal
