import { useMemo, useState } from "react"

import { Stack } from "@mui/material"

import LoadingButton from "@/components/LoadingButton"
import { ChainId, GasLimit, TOEKN_TYPE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useNFTBridgeContext } from "@/contexts/NFTBridgeProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { useAsyncMemo } from "@/hooks"
import useGasFee from "@/hooks/useGasFee"
import useApprove from "@/hooks/useNFTApprove"
import useNFTBridgeStore from "@/stores/nftBridgeStore"

const Send = () => {
  const { walletCurrentAddress } = useWeb3Context()
  const { networksAndSigners } = useApp()

  const { tokenInstance, gatewayAddress, isLayer1 } = useNFTBridgeContext()
  const { contract, selectedList, exciseSelected, updatePromptMessage } = useNFTBridgeStore()
  const selectedTokenIds = useNFTBridgeStore(state => state.selectedTokenIds())
  const { setApproval, checkApproval } = useApprove()
  const { getGasFee } = useGasFee()

  const [sendLoading, setSendLoading] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)

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
      await setApproval(tokenInstance, gatewayAddress)
    } finally {
      setApproveLoading(false)
    }
  }

  const handleSend = () => {
    setSendLoading(true)
    const tx = isLayer1 ? deposite() : withdraw()
    tx.then(result => {
      console.log(result, "tx result")
      exciseSelected()
    })
      .catch(error => {
        updatePromptMessage(error.message)
        console.log(error, "tx error")
      })
      .finally(() => {
        setSendLoading(false)
      })
  }

  const deposite = async () => {
    if (contract.type === TOEKN_TYPE[721]) {
      return await deposite721()
    } else {
      return await deposite1155()
    }
  }

  const deposite721 = async () => {
    const gasFee = await getGasFee(GasLimit.DEPOSIT_ERC721)
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway_721["batchDepositERC721(address,address,uint256[],uint256)"](
      contract.l1,
      walletCurrentAddress,
      selectedTokenIds,
      GasLimit.DEPOSIT_ERC721,
      {
        value: gasFee,
      },
    )
    const txResult = await tx.wait()
    return txResult
  }

  const deposite1155 = async () => {
    const gasFee = await getGasFee(GasLimit.DEPOSIT_ERC1155)
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway_1155["batchDepositERC1155(address,address,uint256[],uint256[],uint256)"](
      contract.l1,
      walletCurrentAddress,
      selectedTokenIds,
      selectedList.map(item => item.transferAmount),
      GasLimit.DEPOSIT_ERC1155,
      {
        value: gasFee,
      },
    )
    const txResult = await tx.wait()
    return txResult
  }

  const withdraw = async () => {
    if (contract.type === "ERC721") {
      return await withdraw721()
    } else if (contract.type === "ERC1155") {
      return await withdraw1155()
    }
  }

  const withdraw721 = async () => {
    const gasFee = await getGasFee(GasLimit.WITHDRAW_ERC721)
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_2].gateway_721["batchWithdrawERC721(address,address,uint256[],uint256)"](
      contract.l2,
      walletCurrentAddress,
      selectedTokenIds,
      GasLimit.WITHDRAW_ERC721,
      { value: gasFee },
    )
    const txResult = await tx.wait()
    return txResult
  }

  const withdraw1155 = async () => {
    const gasFee = await getGasFee(GasLimit.WITHDRAW_ERC1155)
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_2].gateway_1155["batchWithdrawERC1155(address,address,uint256[],uint256[],uint256)"](
      contract.l2,
      walletCurrentAddress,
      selectedTokenIds,
      selectedList.map(item => item.transferAmount),
      GasLimit.WITHDRAW_ERC1155,
      { value: gasFee },
    )
    const txResult = await tx.wait()
    return txResult
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
    </Stack>
  )
}

export default Send
