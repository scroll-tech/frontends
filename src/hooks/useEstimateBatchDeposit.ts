import { parseUnits } from "ethers"
import { useEffect, useState } from "react"

import { CHAIN_ID } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"

type TxOptions = {
  value: bigint
  maxFeePerGas?: bigint | null
  maxPriorityFeePerGas?: bigint | null
}

export function useEstimateBatchDeposit(props) {
  const { fromNetwork, selectedToken } = props
  const { checkConnectedChainId, walletCurrentAddress } = useRainbowContext()
  const { gasLimit, gasPrice } = usePriceFeeContext()

  const { networksAndSigners } = useBridgeContext()

  const [instance, setInstance] = useState<any>(null)

  const minimumAmount = parseUnits("0.001", "ether")

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
    const options: TxOptions = {
      value: minimumAmount + fee,
    }

    return networksAndSigners[CHAIN_ID.L1].batchBridgeGateway.depositETH.estimateGas(options)
  }

  const depositERC20 = async () => {
    const fee = gasPrice * gasLimit

    return instance["depositERC20(address,uint256,uint256)"].estimateGas(selectedToken.address, minimumAmount, gasLimit, {
      value: fee,
    })
  }

  const estimateSend = async () => {
    const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
    if (!isNetworkConnected) return BigInt(0)
    const nativeTokenBalance = await networksAndSigners[fromNetwork.chainId].provider.getBalance(walletCurrentAddress)
    if (!nativeTokenBalance) {
      return null
    } else if (fromNetwork.isL1 && gasLimit && gasPrice) {
      return await estimateSendL1ToL2()
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

  return {
    estimateSend,
  }
}
