import { BigNumber } from "ethers"
import { useEffect, useState } from "react"

import { ChainId, GasLimit } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { usePriceFee } from "@/hooks"

import { ChainIdEnum } from "./useSendTransaction"

export function useEstimateSendTransaction(props) {
  const { fromNetwork, toNetwork, selectedToken } = props

  const { networksAndSigners } = useApp()

  const { checkConnectedChainId } = useWeb3Context()
  const { getPriceFee } = usePriceFee()
  const [estimateGas, setEstimateGas] = useState<any>(null)

  const minimumAmount = BigNumber.from(1)

  useEffect(() => {
    const gateway = networksAndSigners[fromNetwork.isLayer1 ? ChainId.SCROLL_LAYER_1 : ChainId.SCROLL_LAYER_2].gateway
    if (gateway) {
      setEstimateGas(gateway.estimateGas)
    }
  }, [networksAndSigners])

  const depositETH = async () => {
    const fee = await getPriceFee(selectedToken, fromNetwork.isLayer1)
    if (ChainId.SCROLL_LAYER_1 === ChainIdEnum.GOERLI) {
      return estimateGas["depositETH(uint256,uint256)"](minimumAmount, GasLimit.DEPOSIT_ETH, {
        value: minimumAmount.add(fee),
      })
    }
    return estimateGas["depositETH(uint256)"](GasLimit.DEPOSIT_ETH, {
      value: minimumAmount,
    })
  }

  const depositERC20 = async () => {
    const fee = await getPriceFee(selectedToken, fromNetwork.isLayer1)

    if (ChainId.SCROLL_LAYER_1 === ChainIdEnum.GOERLI) {
      return estimateGas["depositERC20(address,uint256,uint256)"](selectedToken.address, minimumAmount, GasLimit.DEPOSIT_ERC20, {
        value: fee,
      })
    }
    return estimateGas["depositERC20(address,uint256,uint256)"](selectedToken.address, minimumAmount, GasLimit.DEPOSIT_ERC20)
  }

  const withdrawETH = async () => {
    const fee = await getPriceFee(selectedToken)
    if (ChainId.SCROLL_LAYER_2 === ChainIdEnum.SCROLL_ALPHA) {
      return estimateGas["withdrawETH(uint256,uint256)"](minimumAmount, GasLimit.WITHDRAW_ETH, {
        value: minimumAmount.add(fee),
      })
    }
    return estimateGas["withdrawETH(uint256)"](GasLimit.WITHDRAW_ETH, {
      value: minimumAmount,
    })
  }

  const withdrawERC20 = async () => {
    const fee = await getPriceFee(selectedToken)
    if (ChainId.SCROLL_LAYER_2 === ChainIdEnum.SCROLL_ALPHA) {
      return estimateGas["withdrawERC20(address,uint256,uint256)"](selectedToken.address, minimumAmount, GasLimit.WITHDRAW_ERC20, {
        value: fee,
      })
    }
    return estimateGas["withdrawERC20(address,uint256,uint256)"](selectedToken.address, minimumAmount, GasLimit.WITHDRAW_ERC20)
  }

  const estimateSend = async () => {
    const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
    if (!isNetworkConnected) return
    if (fromNetwork.isLayer1) {
      return await estimateSendL1ToL2()
    } else if (!fromNetwork.isLayer1 && toNetwork.isLayer1) {
      return await estimateSendL2ToL1()
    }
  }

  const estimateSendL1ToL2 = () => {
    if (selectedToken.native) {
      return depositETH()
    } else {
      return depositERC20()
    }
  }

  const estimateSendL2ToL1 = () => {
    if (selectedToken.native) {
      return withdrawETH()
    } else {
      return withdrawERC20()
    }
  }

  return {
    estimateSend,
  }
}
