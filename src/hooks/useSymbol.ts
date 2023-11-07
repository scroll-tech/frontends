import { ethers } from "ethers"
import useSWR from "swr"

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import { CHAIN_ID, ETH_SYMBOL } from "@/constants"
import { TOKEN_SYMBOL_MAP_KEY } from "@/constants/storageKey"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import { loadState, saveState } from "@/utils/localStorage"

const useSymbol = (address: string, isL1: boolean) => {
  const { networksAndSigners } = useBrigeContext()
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
        return ETH_SYMBOL
      }
      const symbolMap = loadState(TOKEN_SYMBOL_MAP_KEY)
      if (symbolMap?.[address]) {
        return symbolMap[address]
      }
      const erc20 = new ethers.Contract(address, L1_erc20ABI, provider)
      const tokenSymbol = await erc20.symbol()
      saveState(TOKEN_SYMBOL_MAP_KEY, { ...symbolMap, [address]: tokenSymbol })
      return tokenSymbol
    },
  )

  return { loading: isLoading, symbol: data }
}

export default useSymbol
