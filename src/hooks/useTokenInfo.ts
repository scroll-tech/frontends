import { ethers } from "ethers"
import useSWR from "swr"

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import { ChainId, ETH_SYMBOL } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { loadState, saveState } from "@/utils/localStorage"
import { TOKEN_INFO_MAP } from "@/utils/storageKey"

const useTokenInfo = (address: string, isL1: boolean) => {
  const { networksAndSigners } = useApp()
  const { data, isLoading } = useSWR(
    () => {
      const provider = networksAndSigners[isL1 ? ChainId.SCROLL_LAYER_1 : ChainId.SCROLL_LAYER_2].provider
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
        decimals: decimals,
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
