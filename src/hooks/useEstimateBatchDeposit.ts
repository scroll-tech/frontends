import { CHAIN_ID } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBatchBridgeStore from "@/stores/batchBridgeStore"

type TxOptions = {
  value: bigint
  maxFeePerGas?: bigint | null
  maxPriorityFeePerGas?: bigint | null
}

export function useEstimateBatchDeposit(props) {
  const { fromNetwork, selectedToken } = props
  const { checkConnectedChainId, walletCurrentAddress } = useRainbowContext()
  const { batchDepositConfig } = useBatchBridgeStore()

  const { networksAndSigners } = useBridgeContext()

  const depositETH = async () => {
    const options: TxOptions = {
      value: batchDepositConfig.minAmountPerTx + batchDepositConfig.feeAmountPerTx,
    }

    return networksAndSigners[CHAIN_ID.L1].batchBridgeGateway.depositETH.estimateGas(options)
  }

  const depositERC20 = async () => {
    return networksAndSigners[CHAIN_ID.L1].batchBridgeGateway.depositERC20.estimateGas(
      selectedToken.address,
      batchDepositConfig.minAmountPerTx + batchDepositConfig.feeAmountPerTx,
    )
  }

  const estimateSend = async () => {
    const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
    if (!isNetworkConnected) return BigInt(0)
    const nativeTokenBalance = await networksAndSigners[fromNetwork.chainId].provider.getBalance(walletCurrentAddress)
    if (!nativeTokenBalance) {
      return null
    } else if (fromNetwork.isL1 && batchDepositConfig.minAmountPerTx) {
      return await estimateSendL1ToL2()
    }
    return BigInt(0)
  }

  const estimateSendL1ToL2 = () => {
    try {
      if (selectedToken.native) {
        return depositETH()
      } else {
        return depositERC20()
      }
    } catch (error) {
      console.error("estimateSendL1ToL2", error)
    }
  }

  return {
    estimateSend,
  }
}
