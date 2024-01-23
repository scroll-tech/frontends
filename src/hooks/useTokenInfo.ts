import { ethers } from "ethers"
import useSWR from "swr"

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import { CHAIN_ID, ETH_SYMBOL } from "@/constants"
import { TOKEN_INFO_MAP } from "@/constants/storageKey"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { loadState, saveState } from "@/utils/localStorage"

const useTokenInfo = (address: string, isL1: boolean) => {
  const { networksAndSigners } = useBridgeContext()
  const { data, isLoading } = useSWR(
    () => {
      const provider = networksAndSigners[isL1 ? CHAIN_ID.L1 : CHAIN_ID.L2].provider
      if (provider) {
        return {
          address,
          provider,
        }
      }
      return null
    },
    async ({ address, provider }) => {
      if (!address) {
        return {
          symbol: ETH_SYMBOL,
          decimals: 18,
        }
      }
      const symbolMap = loadState(TOKEN_INFO_MAP)
      if (symbolMap?.[address]) {
        return symbolMap[address]
      }
      const erc20 = new ethers.Contract(address, L1_erc20ABI, provider)
      const tokenSymbol = await erc20.symbol()
      const decimals = await erc20.decimals()
      const tokenInfo = {
        symbol: tokenSymbol,
        decimals: Number(decimals),
      }
      saveState(TOKEN_INFO_MAP, {
        ...symbolMap,
        [address]: tokenInfo,
      })
      return tokenInfo
    },
  )
  return { loading: isLoading, tokenInfo: data }
}

export default useTokenInfo
