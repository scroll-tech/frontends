import { useMemo } from "react"

import { Button } from "@mui/material"

import Link from "@/components/Link"
import { RPCUrl } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

import Modal from "../../components/Modal"

const TransactionResultModal = props => {
  const { open, hash, onClose } = props

  const { chainId } = useWeb3Context()

  const txUrl = useMemo(() => {
    if (hash && chainId) {
      const explorer = RPCUrl[chainId]
      return `${explorer}/tx/${hash}`
    }
    return ""
  }, [chainId, hash])

  return (
    <Modal open={open} title="Transaction Submitted" variant="success" onClose={onClose}>
      <Link href={txUrl}>View on block explorer</Link>
      <Button variant="contained" sx={{ mt: "4rem", width: "100%" }} onClick={onClose}>
        Close
      </Button>
    </Modal>
  )
}

export default TransactionResultModal
