import { BrowserProvider, JsonRpcProvider, JsonRpcSigner, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"
import useStorage from "squirrel-gill"
import useSWR, { mutate } from "swr"

import { Alert, Snackbar } from "@mui/material"

import { tokenListUrl } from "@/apis/dynamic"
import BATCH_BRIDGE_GATEWAY_PROXY_ABI from "@/assets/abis/L1BatchBridgeGateway.json"
import L1_SCROLL_MESSENGER_ABI from "@/assets/abis/L1ScrollMessenger.json"
import L1_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L1_GATEWAY_ROUTER_PROXY_ADDR.json"
import L2_SCROLL_MESSENGER_ABI from "@/assets/abis/L2ScrollMessenger.json"
import L2_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L2_GATEWAY_ROUTER_PROXY_ADDR.json"
import { BATCH_BRIDGE_GATEWAY_PROXY_ADDR, CHAIN_ID, GATEWAY_ROUTE_PROXY_ADDR, NATIVE_TOKEN_LIST, RPC_URL, SCROLL_MESSENGER_ADDR } from "@/constants"
import { BLOCK_NUMBERS, USER_TOKEN_LIST } from "@/constants/storageKey"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBlockNumbers from "@/hooks/useBlockNumbers"
import useClaimHistory from "@/hooks/useClaimHistory"
import useTokenPrice from "@/hooks/useTokenPrice"
import useTxHistory, { TxHistory } from "@/hooks/useTxHistory"
import { loadState } from "@/utils/localStorage"

export interface Price {
  usd: number
}

export interface Prices {
  loading: boolean
  price: { [key: string]: Price }
  error: any
}

type BridgeContextProps = {
  networksAndSigners: any
  txHistory: TxHistory
  blockNumbers: number[]
  tokenList: Token[]
  claimHistory: TxHistory
  tokenPrice: Prices
  refreshTokenList: () => void
}

const BridgeContext = createContext<BridgeContextProps | undefined>(undefined)

const BridgeContextProvider = ({ children }: any) => {
  const { provider, walletCurrentAddress, chainId } = useRainbowContext()
  const { isL1Available, isL2Available } = useBlockNumbers()

  const [blockNumbers] = useStorage(localStorage, BLOCK_NUMBERS, [-1, -1])

  const [networksAndSigners, setNetworksAndSigners] = useState({
    [CHAIN_ID.L1]: {},
    [CHAIN_ID.L2]: {},
  })

  const [fetchTokenListError, setFetchTokenListError] = useState("")

  const txHistory = useTxHistory()
  const claimHistory = useClaimHistory()

  // TODO: need refactoring inspired by publicClient and walletClient
  const update = async (walletProvider: BrowserProvider, address: string) => {
    let l1signer,
      l2signer,
      l1Gateway,
      l2Gateway,
      l1Provider,
      l2Provider,
      l1ProviderForSafeBlock,
      l1ScrollMessenger,
      l2ScrollMessenger,
      l1BatchBridgeGateway
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
    l1ScrollMessenger = new ethers.Contract(SCROLL_MESSENGER_ADDR[CHAIN_ID.L1], L1_SCROLL_MESSENGER_ABI, l1signer)
    l2ScrollMessenger = new ethers.Contract(SCROLL_MESSENGER_ADDR[CHAIN_ID.L2], L2_SCROLL_MESSENGER_ABI, l2signer)
    l1BatchBridgeGateway = new ethers.Contract(BATCH_BRIDGE_GATEWAY_PROXY_ADDR[CHAIN_ID.L1], BATCH_BRIDGE_GATEWAY_PROXY_ABI, l1signer)

    setNetworksAndSigners({
      [CHAIN_ID.L1]: {
        provider: l1Provider,
        signer: l1signer,
        gateway: l1Gateway,
        scrollMessenger: l1ScrollMessenger,
        batchBridgeGateway: l1BatchBridgeGateway,
      },
      [`${CHAIN_ID.L1}ForSafeBlock`]: {
        provider: l1ProviderForSafeBlock,
      },
      [CHAIN_ID.L2]: {
        provider: l2Provider,
        signer: l2signer,
        gateway: l2Gateway,
        scrollMessenger: l2ScrollMessenger,
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
        return null
      })
  })

  const tokenPrice = useTokenPrice(tokenList)

  const refreshTokenList = () => {
    mutate(tokenListUrl)
  }

  useEffect(() => {
    if (provider && walletCurrentAddress) {
      update(provider, walletCurrentAddress)
    }
  }, [provider, walletCurrentAddress, chainId])

  const handleClose = () => {
    setFetchTokenListError("")
  }

  return (
    <BridgeContext.Provider
      value={{
        networksAndSigners,
        txHistory,
        blockNumbers,
        claimHistory,
        tokenList: tokenList ?? NATIVE_TOKEN_LIST,
        refreshTokenList,
        tokenPrice,
      }}
    >
      {children}
      {/* TODO: unify error reporting */}
      <Snackbar open={!!fetchTokenListError} autoHideDuration={null} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ ".MuiAlert-action": { padding: "0 0.8rem" } }}>
          {fetchTokenListError}
        </Alert>
      </Snackbar>
      {!isL1Available && (
        <Snackbar open={true}>
          <Alert severity="error" key="l1">
            {RPC_URL.L1} is not available, please wait...
          </Alert>
        </Snackbar>
      )}
      {!isL2Available && (
        <Snackbar open={true}>
          <Alert severity="error" key="l2">
            {RPC_URL.L2} is not available, please wait...
          </Alert>
        </Snackbar>
      )}
    </BridgeContext.Provider>
  )
}

export function useBridgeContext() {
  const ctx = useContext(BridgeContext)
  if (!ctx) {
    throw new Error("useBridgeContext must be used within BridgeContextProvider")
  }
  return ctx
}

export default BridgeContextProvider
