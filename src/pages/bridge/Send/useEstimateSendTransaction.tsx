import { useEffect, useState } from "react"

import { CHAIN_ID } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"

export function useEstimateSendTransaction(props) {
  const { fromNetwork, toNetwork, selectedToken } = props

  const { networksAndSigners } = useApp()

  const { checkConnectedChainId } = useRainbowContext()
  const { gasLimit, gasPrice } = usePriceFeeContext()
  const [instance, setInstance] = useState<any>(null)
  // const [instance, setEstimateGas] = useState<any>(null)

  const minimumAmount = BigInt(1)

  useEffect(() => {
    const gateway = networksAndSigners[fromNetwork.isL1 ? CHAIN_ID.L1 : CHAIN_ID.L2].gateway
    if (gateway) {
      setInstance(gateway)
    }
  }, [networksAndSigners])

  const depositETH = async () => {
    const fee = gasPrice * gasLimit
    return instance["depositETH(uint256,uint256)"].estimateGas(minimumAmount, gasLimit, {
      value: minimumAmount + fee,
    })
  }

  const depositERC20 = async () => {
    const fee = gasPrice * gasLimit

    return instance["depositERC20(address,uint256,uint256)"].estimateGas(selectedToken.address, minimumAmount, gasLimit, {
      value: fee,
    })
  }

  const withdrawETH = async () => {
    return instance["withdrawETH(uint256,uint256)"].estimateGas(minimumAmount, 0, {
      value: minimumAmount,
    })
  }

  const withdrawERC20 = async () => {
    return instance["withdrawERC20(address,uint256,uint256)"].estimateGas(selectedToken.address, minimumAmount, 0)
  }

  const estimateSend = async () => {
    const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
    if (!isNetworkConnected) return
    if (fromNetwork.isL1) {
      return await estimateSendL1ToL2()
    } else if (!fromNetwork.isL1 && toNetwork.isL1) {
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
