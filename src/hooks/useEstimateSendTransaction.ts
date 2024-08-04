import { useEffect, useState } from "react"

import { CHAIN_ID, GAS_TOKEN_ADDR } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { isAlternativeGasTokenEnabled } from "@/utils"

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
    if (isAlternativeGasTokenEnabled) {
      const wrappedTokenGateway = networksAndSigners[CHAIN_ID.L1].wrappedTokenGateway
      return wrappedTokenGateway.deposit.estimateGas(walletCurrentAddress, minimumAmount, {
        value: minimumAmount,
      })
    }

    const fee = gasPrice * gasLimit
    return instance["sendMessage(address,uint256,bytes,uint256)"].estimateGas(walletCurrentAddress, minimumAmount, "0x", gasLimit, {
      value: minimumAmount + fee,
    })
  }

  const depositGasToken = async () => {
    return networksAndSigners[CHAIN_ID.L1].gasTokenGateway.depositETH.estimateGas(walletCurrentAddress, minimumAmount, 300000, {
      value: minimumAmount,
    })
  }

  const depositERC20 = async () => {
    const fee = gasPrice * gasLimit

    return instance["depositERC20(address,uint256,uint256)"].estimateGas(selectedToken.address, minimumAmount, gasLimit, {
      value: fee,
    })
  }

  const withdrawETH = async () => {
    if (isAlternativeGasTokenEnabled) {
      return networksAndSigners[CHAIN_ID.L2].gateway["withdrawETH(uint256,uint256)"].estimateGas(minimumAmount, 0, {
        value: minimumAmount,
      })
    }

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
    } else if (selectedToken.address === GAS_TOKEN_ADDR[CHAIN_ID.L1]) {
      return depositGasToken()
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
