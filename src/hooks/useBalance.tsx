import { ethers } from "ethers"
import useSWR from "swr"

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

const useBalance = (token: any, network?: any) => {
  const { walletCurrentAddress } = useWeb3Context()
  const { networksAndSigners } = useApp()

  async function fetchBalance({ provider, token, network, address }) {
    try {
      if (!address || !provider || !token.chainId) {
        return null
      }
      if (token.native) {
        return await provider.getBalance(address)
      }
      const l1ERC20 = new ethers.Contract(token.address, L1_erc20ABI, provider)
      return await l1ERC20.balanceOf(address)
    } catch (error) {
      console.log(error)
    }
  }

  const { data, error, isLoading } = useSWR(
    () => {
      const provider = networksAndSigners[network.chainId].provider
      if (network && token) {
        return {
          provider,
          token,
          network,
          address: walletCurrentAddress,
        }
      }
      return null
    },
    fetchBalance,
    {
      refreshInterval: 3e3,
    },
  )
  return {
    loading: isLoading,
    balance: data,
    error,
  }
}

export default useBalance
