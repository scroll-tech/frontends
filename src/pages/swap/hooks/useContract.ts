import { Contract } from "@ethersproject/contracts"
import IUniswapV2Pair from "@uniswap/v2-core/build/IUniswapV2Pair.json"
import { useMemo } from "react"
import { ChainId, WETH } from "uniswap-v2-sdk-scroll"
import ENS_PUBLIC_RESOLVER_ABI from "../constants/abis/ens-public-resolver.json"
import ENS_ABI from "../constants/abis/ens-registrar.json"
import { ERC20_BYTES32_ABI } from "../constants/abis/erc20"
import ERC20_ABI from "../constants/abis/erc20.json"
import { MIGRATOR_ABI, MIGRATOR_ADDRESS } from "../constants/abis/migrator"
import UNISOCKS_ABI from "../constants/abis/unisocks.json"
import WETH_ABI from "../constants/abis/weth.json"
import { MULTICALL_ABI, MULTICALL_NETWORKS } from "../constants/multicall"
import { V1_EXCHANGE_ABI, V1_FACTORY_ABI, V1_FACTORY_ADDRESSES } from "../constants/v1"
import { getContract } from "../utils"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { SUPPORTED_CHAINID } from "../constants"

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { provider, walletCurrentAddress } = useWeb3Context()

  return useMemo(() => {
    if (!address || !ABI || !provider) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && walletCurrentAddress ? walletCurrentAddress : undefined)
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, provider, withSignerIfPossible, walletCurrentAddress])
}

export function useV1FactoryContract(): Contract | null {
  const { chainId } = useWeb3Context()
  return useContract(V1_FACTORY_ADDRESSES[chainId as number], V1_FACTORY_ABI, false)
}

export function useV2MigratorContract(): Contract | null {
  return useContract(MIGRATOR_ADDRESS, MIGRATOR_ABI, true)
}

export function useV1ExchangeContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, V1_EXCHANGE_ABI, withSignerIfPossible)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { checkConnectedChainId } = useWeb3Context()
  return useContract(checkConnectedChainId(SUPPORTED_CHAINID) ? WETH[SUPPORTED_CHAINID].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useWeb3Context()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.GÖRLI:
      case ChainId.ROPSTEN:
      case ChainId.RINKEBY:
        address = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2Pair.abi, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useWeb3Context()
  return useContract(MULTICALL_NETWORKS[chainId as number], MULTICALL_ABI, false)
}

export function useSocksController(): Contract | null {
  const { chainId } = useWeb3Context()
  return useContract(chainId === ChainId.MAINNET ? "0x65770b5283117639760beA3F867b69b3697a91dd" : undefined, UNISOCKS_ABI, false)
}
