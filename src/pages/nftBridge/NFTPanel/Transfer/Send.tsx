import { useMemo, useState } from "react"

import { Stack } from "@mui/material"

import LoadingButton from "@/components/LoadingButton"
import { ChainId, TOEKN_TYPE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useNFTBridgeContext } from "@/contexts/NFTBridgeProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { useAsyncMemo } from "@/hooks"
import useGasFee from "@/hooks/useGasFee"
import useApprove from "@/hooks/useNFTApprove"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import useNFTTxStore from "@/stores/nftTxStore"

import ApproveLoadingModal from "./ApproveLoadingModal"
import SendLoadingModal from "./SendLoadingModal"
import TransactionResultModal from "./TransactionResultModal"

const Send = () => {
  const { walletCurrentAddress } = useWeb3Context()
  const { networksAndSigners } = useApp()

  const { addNFTTransaction, updateNFTTransaction } = useNFTTxStore()
  const { tokenInstance, gatewayAddress, isLayer1 } = useNFTBridgeContext()
  const { contract, selectedList, exciseSelected, updatePromptMessage, fromNetwork, toNetwork } = useNFTBridgeStore()
  const selectedTokenIds = useNFTBridgeStore(state => state.selectedTokenIds())

  const { setApproval, checkApproval } = useApprove()
  const { gasLimit, gasFee } = useGasFee()

  // button loading
  const [sendLoading, setSendLoading] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)

  // modal loading
  const [sendModalLoading, setSendModalLoading] = useState(false)
  const [approveModalLoading, setApproveModalLoading] = useState(false)

  const [txHash, setTxHash] = useState("")

  const needApproval = useAsyncMemo(async () => {
    if (tokenInstance) {
      const isApproved = await checkApproval(tokenInstance, gatewayAddress)
      return !isApproved
    }
    return false
  }, [tokenInstance, contract])

  const sendActive = useMemo(() => {
    if (!walletCurrentAddress) {
      return false
    } else if (!selectedList.length) {
      return false
    } else if (contract.type === TOEKN_TYPE[1155]) {
      const isValid = selectedList.every(item => item.transferAmount && item.transferAmount > 0)
      return isValid
    }

    return true
  }, [walletCurrentAddress, selectedList, contract.type])

  const handleApprove = async () => {
    try {
      setApproveLoading(true)
      setApproveModalLoading(true)
      await setApproval(tokenInstance, gatewayAddress)
    } finally {
      setApproveLoading(false)
      setApproveModalLoading(false)
    }
  }

  const handleSend = async () => {
    setSendLoading(true)
    setSendModalLoading(true)
    const tx = isLayer1 ? await deposite() : await withdraw()
    addNFTTransaction({
      hash: tx.hash,
      fromName: fromNetwork.name,
      toName: toNetwork.name,
      fromExplore: fromNetwork.explorer,
      toExplore: toNetwork.explorer,
      tokenType: contract.type,
      tokenAddress: isLayer1 ? contract.l1 : contract.l2,
      amounts: selectedList.map(item => item.transferAmount),
      tokenIds: selectedTokenIds,
      isL1: isLayer1,
    })
    tx.wait()
      .then(receipt => {
        console.log(receipt, "send receipt")
        updateNFTTransaction(tx.hash, {
          fromBlockNumber: receipt.blockNumber,
        })
        setTxHash(receipt.transactionHash)
        exciseSelected()
      })
      .catch(error => {
        updatePromptMessage(error.message)
      })
      .finally(() => {
        setSendLoading(false)
        setSendModalLoading(false)
      })
  }

  const deposite = () => {
    if (contract.type === TOEKN_TYPE[721]) {
      return deposite721()
    }
    return deposite1155()
  }

  const deposite721 = async () => {
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway_721["batchDepositERC721(address,address,uint256[],uint256)"](
      contract.l1,
      walletCurrentAddress,
      selectedTokenIds,
      gasLimit,
      {
        value: gasFee,
      },
    )
    return tx
  }

  const deposite1155 = async () => {
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway_1155["batchDepositERC1155(address,address,uint256[],uint256[],uint256)"](
      contract.l1,
      walletCurrentAddress,
      selectedTokenIds,
      selectedList.map(item => item.transferAmount),
      gasLimit,
      {
        value: gasFee,
      },
    )
    return tx
  }

  const withdraw = () => {
    if (contract.type === "ERC721") {
      return withdraw721()
    }
    return withdraw1155()
  }

  const withdraw721 = async () => {
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_2].gateway_721["batchWithdrawERC721(address,address,uint256[],uint256)"](
      contract.l2,
      walletCurrentAddress,
      selectedTokenIds,
      gasLimit,
      { value: gasFee },
    )
    return tx
  }

  const withdraw1155 = async () => {
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_2].gateway_1155["batchWithdrawERC1155(address,address,uint256[],uint256[],uint256)"](
      contract.l2,
      walletCurrentAddress,
      selectedTokenIds,
      selectedList.map(item => item.transferAmount),
      gasLimit,
      { value: gasFee },
    )
    return tx
  }

  const handleCloseSendModal = () => {
    setSendModalLoading(false)
  }

  const handleCloseApproveModal = () => {
    setApproveModalLoading(false)
  }

  const handleCloseResultModal = () => {
    setTxHash("")
  }

  return (
    <Stack direction="row" sx={{ width: "100%", justifyContent: "center", mt: "2rem" }}>
      {needApproval ? (
        <LoadingButton variant="contained" sx={{ width: "calc(100% - 4rem)" }} loading={approveLoading} onClick={handleApprove}>
          APPROVE
        </LoadingButton>
      ) : (
        <LoadingButton variant="contained" sx={{ width: "calc(100% - 4rem)" }} loading={sendLoading} disabled={!sendActive} onClick={handleSend}>
          SEND
        </LoadingButton>
      )}
      <SendLoadingModal open={sendModalLoading} onClose={handleCloseSendModal}></SendLoadingModal>
      <ApproveLoadingModal open={approveModalLoading} onClose={handleCloseApproveModal}></ApproveLoadingModal>
      <TransactionResultModal hash={txHash} open={!!txHash} onClose={handleCloseResultModal}></TransactionResultModal>
    </Stack>
  )
}

export default Send
