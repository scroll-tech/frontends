import { ethers } from "ethers"
import { useCallback, useEffect, useMemo, useState } from "react"

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import { GATEWAY_ROUTE_PROXY_ADDR, USDC_GATEWAY_PROXY_ADDR, USDC_SYMBOL, WETH_GATEWAY_PROXY_ADDR, WETH_SYMBOL } from "@/constants"
import { CHAIN_ID } from "@/constants"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { amountToBN } from "@/utils"

const useApprove = (fromNetwork, selectedToken, amount) => {
  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { networksAndSigners } = useBrigeContext()

  const [isLoading, setIsLoading] = useState(false)
  const [isRequested, setIsRequested] = useState(false)
  const [error, setError] = useState(null)

  const [isNeeded, setIsNeeded] = useState<boolean>()

  const approveAddress = useMemo(() => {
    if (!fromNetwork.isL1 && selectedToken.symbol === WETH_SYMBOL) return WETH_GATEWAY_PROXY_ADDR[fromNetwork.chainId]
    if (!fromNetwork.isL1 && selectedToken.symbol === USDC_SYMBOL) return USDC_GATEWAY_PROXY_ADDR[fromNetwork.chainId]

    return GATEWAY_ROUTE_PROXY_ADDR[fromNetwork.chainId]
  }, [fromNetwork, selectedToken])

  const tokenInstance = useMemo(() => {
    // ETH & L2 ERC20 don't need approval
    const hasSigner = networksAndSigners[chainId as number]?.signer
    const isNativeToken = selectedToken.native
    const isL2Erc20 = selectedToken.chainId === CHAIN_ID.L2 && selectedToken.symbol !== WETH_SYMBOL && selectedToken.symbol !== USDC_SYMBOL

    if (hasSigner && !isNativeToken && !isL2Erc20) {
      const { address } = selectedToken as ERC20Token
      const { signer } = networksAndSigners[chainId as number]
      return new ethers.Contract(address, L1_erc20ABI, signer)
    }

    return null
  }, [selectedToken, networksAndSigners[chainId as number]])

  const checkApproval = useCallback(async () => {
    try {
      if (!tokenInstance) {
        return false
      }
      if (!amount) {
        return undefined
      }

      const parsedAmount = amountToBN(amount, selectedToken.decimals)
      const approvedAmount = await tokenInstance.allowance(walletCurrentAddress, approveAddress)
      if (approvedAmount >= parsedAmount) {
        return false
      }
      return true
    } catch (err) {
      return undefined
    }
  }, [tokenInstance, selectedToken, walletCurrentAddress, approveAddress, amount])

  useEffect(() => {
    checkApproval().then(needApproval => {
      setIsNeeded(needApproval)
    })
  }, [checkApproval])

  const approve = async isMaximum => {
    if (!tokenInstance) {
      return
    }
    setIsLoading(true)

    const toApproveAmount = isMaximum ? ethers.MaxUint256 : amountToBN(amount, selectedToken.decimals)

    try {
      const tx = await tokenInstance.approve(approveAddress, toApproveAmount)
      setIsRequested(true)
      await tx?.wait()
      const needApproval = await checkApproval()
      setIsNeeded(needApproval)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
      setIsRequested(false)
    }
  }

  // TODO: test
  const cancelApproval = async () => {
    const tx = await tokenInstance?.approve(approveAddress, 0)
    await tx?.wait()
    const needApproval = await checkApproval()
    setIsNeeded(needApproval)
  }

  return { approve, isNeeded, isLoading, isRequested, error, cancelApproval }
}

export default useApprove
