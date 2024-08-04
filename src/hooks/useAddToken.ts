import { ethers } from "ethers"
import { useEffect, useState } from "react"

import L1_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L1_GATEWAY_ROUTER_PROXY_ADDR.json"
import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import L2_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L2_GATEWAY_ROUTER_PROXY_ADDR.json"
import { CHAIN_ID, GAS_TOKEN_ADDR, GATEWAY_ROUTE_PROXY_ADDR, WETH_ADDR } from "@/constants"
import { USER_TOKEN_LIST } from "@/constants/storageKey"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { isAlternativeGasTokenEnabled } from "@/utils"
import { loadState, saveState } from "@/utils/localStorage"

export enum TOKEN_LEVEL {
  offical = "offical",
  thirdParty = "thirdParty",
  local = "local",
}

const useAddToken = () => {
  const { networksAndSigners, refreshTokenList } = useBridgeContext()
  const [isLoading, setIsLoading] = useState(false)

  const getProvider = chainId => networksAndSigners[chainId].provider

  const getContract = (address, ABI, provider) => new ethers.Contract(address, ABI, provider)

  const getTokenDetails = async contract => {
    try {
      const [name, symbol, decimals] = await Promise.all([contract.name(), contract.symbol(), contract.decimals()])
      return { name, symbol, decimals: Number(decimals) }
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    if (isAlternativeGasTokenEnabled) {
      addToken(WETH_ADDR[CHAIN_ID.L1], true, TOKEN_LEVEL.offical)
      addGasToken()
    }
  }, [networksAndSigners[CHAIN_ID.L1].provider])

  const addGasToken = async () => {
    try {
      const l1Provider = getProvider(CHAIN_ID.L1)
      const l1TokenAddress = GAS_TOKEN_ADDR[CHAIN_ID.L1]
      const l1TokenContract = getContract(l1TokenAddress, L1_erc20ABI, l1Provider)
      const l1TokenDetails = await getTokenDetails(l1TokenContract)

      const l1Token = {
        ...l1TokenDetails,
        chainId: CHAIN_ID.L1,
        address: l1TokenAddress,
        tokenLevel: TOKEN_LEVEL.offical,
      }

      const l2Token = {
        ...l1TokenDetails,
        chainId: CHAIN_ID.L2,
        native: true,
        decimals: 18,
        tokenLevel: TOKEN_LEVEL.offical,
      }

      storeNewToken(l1Token)
      storeNewToken(l2Token)
    } catch (error) {}
  }

  const addToken = async (address, isL1, level = TOKEN_LEVEL.local) => {
    setIsLoading(true)
    const l1Provider = getProvider(CHAIN_ID.L1)
    const l2Provider = getProvider(CHAIN_ID.L2)

    const l1Erc20Gateway = getContract(GATEWAY_ROUTE_PROXY_ADDR[CHAIN_ID.L1], L1_GATEWAY_ROUTER_PROXY_ABI, l1Provider)
    const l2Erc20Gateway = getContract(GATEWAY_ROUTE_PROXY_ADDR[CHAIN_ID.L2], L2_GATEWAY_ROUTER_PROXY_ABI, l2Provider)

    try {
      const l1TokenAddress = isL1 ? address : await l2Erc20Gateway.getL1ERC20Address(address)
      const l2TokenAddress = isL1 ? await l1Erc20Gateway.getL2ERC20Address(address) : address
      const l1TokenContract = getContract(l1TokenAddress, L1_erc20ABI, l1Provider)
      const l2TokenContract = getContract(l2TokenAddress, L1_erc20ABI, l2Provider)
      if (l1TokenAddress === ethers.ZeroAddress || l2TokenAddress === ethers.ZeroAddress) {
        throw new Error("Token not found")
      }

      const l1TokenDetails = await getTokenDetails(l1TokenContract)

      const l2TokenDetails = await getTokenDetails(l2TokenContract)

      const l1Token = {
        ...l1TokenDetails,
        chainId: CHAIN_ID.L1,
        address: l1TokenAddress,
        tokenLevel: level,
      }
      const l2Token = {
        ...(l2TokenDetails ? l2TokenDetails : l1TokenDetails),
        chainId: CHAIN_ID.L2,
        address: l2TokenAddress,
        tokenLevel: level,
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
      t => t.address?.toLowerCase() === token.address?.toLowerCase() && t.chainId === token.chainId,
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
