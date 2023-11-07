import { BrowserProvider, JsonRpcProvider, JsonRpcSigner, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"
import useStorage from "squirrel-gill"
import useSWR, { mutate } from "swr"

import { Alert, Snackbar } from "@mui/material"

import { tokenListUrl } from "@/apis/dynamic"
import L1_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L1_GATEWAY_ROUTER_PROXY_ADDR.json"
import L2_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L2_GATEWAY_ROUTER_PROXY_ADDR.json"
import { CHAIN_ID, ETH_SYMBOL, GATEWAY_ROUTE_PROXY_ADDR, NATIVE_TOKEN_LIST, RPC_URL } from "@/constants"
import { BLOCK_NUMBERS, BRIDGE_TOKEN_SYMBOL, USER_TOKEN_LIST } from "@/constants/storageKey"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useClaim from "@/hooks/useClaim"
import useTxHistory, { TxHistory } from "@/hooks/useTxHistory"
import { loadState } from "@/utils/localStorage"

type BridgeContextProps = {
  networksAndSigners: any
  txHistory: TxHistory
  blockNumbers: number[]
  tokenList: Token[]
  claim: any
  refreshTokenList: () => void
}

const BridgeContext = createContext<BridgeContextProps | undefined>(undefined)

const BridgeContextProvider = ({ children }: any) => {
  const { provider, walletCurrentAddress, chainId } = useRainbowContext()
  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)
  const [blockNumbers] = useStorage(localStorage, BLOCK_NUMBERS, [-1, -1])

  const [networksAndSigners, setNetworksAndSigners] = useState({
    [CHAIN_ID.L1]: {},
    [CHAIN_ID.L2]: {},
  })

  const [fetchTokenListError, setFetchTokenListError] = useState("")

  const txHistory = useTxHistory(networksAndSigners)
  const claim = useClaim()

  // TODO: need refactoring inspired by publicClient and walletClient
  const update = async (walletProvider: BrowserProvider, address: string) => {
    let l1signer, l2signer, l1Gateway, l2Gateway, l1Provider, l2Provider, l1ProviderForSafeBlock
    if (chainId === CHAIN_ID.L1) {
      l1Provider = walletProvider
      l2Provider = await new JsonRpcProvider(RPC_URL.L2)
      l1signer = await walletProvider.getSigner(0)
      l2signer = new JsonRpcSigner(l2Provider, address)
      l1Gateway = new ethers.Contract(GATEWAY_ROUTE_PROXY_ADDR[CHAIN_ID.L1], L1_GATEWAY_ROUTER_PROXY_ABI, l1signer)
    } else if (chainId === CHAIN_ID.L2) {
      l1Provider = await new JsonRpcProvider(RPC_URL.L1)
      l2Provider = walletProvider
      l1signer = new JsonRpcSigner(l1Provider, address)
      l2signer = await walletProvider.getSigner(0)
      l2Gateway = new ethers.Contract(GATEWAY_ROUTE_PROXY_ADDR[CHAIN_ID.L2], L2_GATEWAY_ROUTER_PROXY_ABI, l2signer)
    } else {
      l1Provider = await new JsonRpcProvider(RPC_URL.L1)
      l2Provider = await new JsonRpcProvider(RPC_URL.L2)
    }
    // TODO: publicProvider
    l1ProviderForSafeBlock = await new JsonRpcProvider(RPC_URL.L1)

    setNetworksAndSigners({
      [CHAIN_ID.L1]: {
        provider: l1Provider,
        signer: l1signer,
        gateway: l1Gateway,
      },
      [`${CHAIN_ID.L1}ForSafeBlock`]: {
        provider: l1ProviderForSafeBlock,
      },
      [CHAIN_ID.L2]: {
        provider: l2Provider,
        signer: l2signer,
        gateway: l2Gateway,
      },
    })
  }

  const { data: tokenList } = useSWR(tokenListUrl, url => {
    return scrollRequest(url)
      .then((data: any) => {
        const tokensListTokens = data.tokens
        const currentUserTokens = loadState(USER_TOKEN_LIST) || []

        const combinedList = [...NATIVE_TOKEN_LIST, ...tokensListTokens, ...currentUserTokens]
        const uniqueList = combinedList.reduce(
          (accumulator, token) => {
            // If the token doesn't have an address, consider it a native token and add it directly
            if (!token.address) {
              accumulator.result.push(token)
              return accumulator
            }
            // Convert address to lowercase for case-insensitive deduplication
            const lowercaseAddress = token.address.toLowerCase()
            // Create a key combining address and chainId to ensure different chainIds are not deduplicated
            const key = `${lowercaseAddress}-${token.chainId}`

            if (!accumulator.seen[key]) {
              accumulator.seen[key] = true
              accumulator.result.push(token)
            }
            return accumulator
          },
          { seen: {}, result: [] },
        ).result

        return uniqueList
      })
      .catch(() => {
        setFetchTokenListError("Fail to fetch token list")
        setTokenSymbol(ETH_SYMBOL)
        return null
      })
  })

  const refreshTokenList = () => {
    mutate(tokenListUrl)
  }

  useEffect(() => {
    if (provider && walletCurrentAddress) {
      update(provider, walletCurrentAddress)
    }
  }, [provider, walletCurrentAddress, chainId])

  useEffect(() => {
    const fromToken = tokenList?.find(item => item.chainId === chainId && item.symbol === tokenSymbol)
    if (!fromToken) {
      setTokenSymbol(ETH_SYMBOL)
    }
  }, [chainId, tokenList])

  const handleClose = () => {
    setFetchTokenListError("")
  }

  return (
    <BridgeContext.Provider
      value={{
        networksAndSigners,
        txHistory,
        blockNumbers,
        claim,
        tokenList: tokenList ?? NATIVE_TOKEN_LIST,
        refreshTokenList,
      }}
    >
      {children}
      {/* TODO: unify error reporting */}
      <Snackbar open={!!fetchTokenListError} autoHideDuration={null} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ ".MuiAlert-action": { padding: "0 0.8rem" } }}>
          {fetchTokenListError}
        </Alert>
      </Snackbar>
    </BridgeContext.Provider>
  )
}

export function useBrigeContext() {
  const ctx = useContext(BridgeContext)
  if (!ctx) {
    throw new Error("useBrigeContext must be used within BridgeContextProvider")
  }
  return ctx
}

export default BridgeContextProvider
