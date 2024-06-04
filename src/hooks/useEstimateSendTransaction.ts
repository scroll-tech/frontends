import { useEffect, useState } from "react"

import { CHAIN_ID } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"

export function useEstimateSendTransaction(props) {
  const { fromNetwork, toNetwork, selectedToken } = props
  const { checkConnectedChainId, walletCurrentAddress } = useRainbowContext()
  const { gasLimit, gasPrice } = usePriceFeeContext()

  const { networksAndSigners } = useBridgeContext()

  const [instance, setInstance] = useState<any>(null)

  const minimumAmount = BigInt(1)

  useEffect(() => {
    const instance = selectedToken.native
      ? networksAndSigners[fromNetwork.isL1 ? CHAIN_ID.L1 : CHAIN_ID.L2].scrollMessenger
      : networksAndSigners[fromNetwork.isL1 ? CHAIN_ID.L1 : CHAIN_ID.L2].gateway
    if (instance) {
      setInstance(instance)
    }
  }, [networksAndSigners, fromNetwork, selectedToken.native])

  const depositETH = async () => {
    const fee = gasPrice * gasLimit
    return instance["sendMessage(address,uint256,bytes,uint256)"].estimateGas(walletCurrentAddress, minimumAmount, "0x", gasLimit, {
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
    return instance["sendMessage(address,uint256,bytes,uint256)"].estimateGas(walletCurrentAddress, minimumAmount, "0x", 0, {
      value: minimumAmount,
    })
  }

  const withdrawERC20 = async () => {
    return instance["withdrawERC20(address,uint256,uint256)"].estimateGas(selectedToken.address, minimumAmount, 0)
  }

  const estimateSend = async () => {
    const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
    if (!isNetworkConnected) return BigInt(0)
    const nativeTokenBalance = await networksAndSigners[fromNetwork.chainId].provider.getBalance(walletCurrentAddress)
    if (!nativeTokenBalance) {
      return null
    } else if (fromNetwork.isL1 && gasLimit && gasPrice) {
      return await estimateSendL1ToL2()
    } else if (!fromNetwork.isL1 && toNetwork.isL1) {
      return await estimateSendL2ToL1()
    }
    return null
  }

  const estimateSendL1ToL2 = () => {
    if (selectedToken.native) {
      return depositETH()
    } else {
      return depositERC20()
    }
  }

  const estimateSendL2ToL1 = async () => {
    if (selectedToken.native) {
      return await withdrawETH()
    } else {
      return await withdrawERC20()
    }
  }

  return {
    estimateSend,
    instance,
  }
}
