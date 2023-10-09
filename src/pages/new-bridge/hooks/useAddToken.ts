import { ethers } from "ethers"
import { useState } from "react"

import L1StandardERC20Gateway from "@/assets/abis/L1StandardERC20Gateway.json"
import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import L2StandardERC20Gateway from "@/assets/abis/L2StandardERC20Gateway.json"
import { CHAIN_ID } from "@/constants"
import { USER_TOKEN_LIST } from "@/constants/storageKey"
import { useApp } from "@/contexts/AppContextProvider"
import { requireEnv } from "@/utils"
import { loadState, saveState } from "@/utils/localStorage"

export enum TOKEN_LEVEL {
  offical = "offical",
  thirdParty = "thirdParty",
  local = "local",
}

const useAddToken = () => {
  const { networksAndSigners, refreshTokenList } = useApp()
  const [isLoading, setIsLoading] = useState(false)

  const getProvider = chainId => networksAndSigners[chainId].provider

  const getContract = (address, ABI, provider) => new ethers.Contract(address, ABI, provider)

  const getTokenDetails = async contract => {
    const [name, symbol, decimals] = await Promise.all([contract.name(), contract.symbol(), contract.decimals()])
    return { name, symbol, decimals: Number(decimals) }
  }

  const addToken = async (address, isL1) => {
    setIsLoading(true)
    const l1Provider = getProvider(CHAIN_ID.L1)
    const l2Provider = getProvider(CHAIN_ID.L2)

    const l1Erc20Gateway = getContract(requireEnv("REACT_APP_L1_STANDARD_ERC20_GATEWAY_PROXY_ADDR"), L1StandardERC20Gateway, l1Provider)
    const l2Erc20Gateway = getContract(requireEnv("REACT_APP_L2_STANDARD_ERC20_GATEWAY_PROXY_ADDR"), L2StandardERC20Gateway, l2Provider)

    try {
      const l1TokenAddress = isL1 ? address : await l2Erc20Gateway.getL1ERC20Address(address)
      const l2TokenAddress = isL1 ? await l1Erc20Gateway.getL2ERC20Address(address) : address
      const l1TokenContract = getContract(l1TokenAddress, L1_erc20ABI, l1Provider)
      const l2TokenContract = getContract(l2TokenAddress, L1_erc20ABI, l2Provider)

      const l1TokenDetails = await getTokenDetails(l1TokenContract)
      const l2TokenDetails = await getTokenDetails(l2TokenContract)

      const l1Token = {
        ...l1TokenDetails,
        chainId: CHAIN_ID.L1,
        address: l1TokenAddress,
        tokenLevel: TOKEN_LEVEL.local,
      }
      const l2Token = {
        ...l2TokenDetails,
        chainId: CHAIN_ID.L2,
        address: l2TokenAddress,
        tokenLevel: TOKEN_LEVEL.local,
      }

      storeNewToken(l1Token)
      storeNewToken(l2Token)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const storeNewToken = token => {
    const currentUserTokens = loadState(USER_TOKEN_LIST) || []
    const existingTokenIndex = currentUserTokens.findIndex(
      t => t.address.toLowerCase() === token.address.toLowerCase() && t.chainId === token.chainId,
    )
    if (existingTokenIndex !== -1) {
      currentUserTokens[existingTokenIndex] = token
    } else {
      currentUserTokens.push(token)
    }
    saveState(USER_TOKEN_LIST, currentUserTokens)
    refreshTokenList()
  }

  return { loading: isLoading, addToken }
}

export default useAddToken