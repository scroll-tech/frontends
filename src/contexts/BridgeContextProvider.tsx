import { BrowserProvider, JsonRpcProvider, JsonRpcSigner, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"
import useStorage from "squirrel-gill"

import { Alert, Snackbar } from "@mui/material"

import L1_GAS_TOKEN_GATEWAY_ABI from "@/assets/abis/L1GasTokenGateway.json"
import L1_SCROLL_MESSENGER_ABI from "@/assets/abis/L1ScrollMessenger.json"
import L1_WRAPPED_TOKEN_GATEWAY_ABI from "@/assets/abis/L1WrappedTokenGateway.json"
import L1_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L1_GATEWAY_ROUTER_PROXY_ADDR.json"
import L2_SCROLL_MESSENGER_ABI from "@/assets/abis/L2ScrollMessenger.json"
import L2_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L2_GATEWAY_ROUTER_PROXY_ADDR.json"
import {
  CHAIN_ID,
  GAS_TOKEN_GATEWAY,
  GATEWAY_ROUTE_PROXY_ADDR,
  NATIVE_TOKEN_LIST,
  RPC_URL,
  SCROLL_MESSENGER_ADDR,
  WRAPPED_TOKEN_GATEWAY_ADDR,
} from "@/constants"
import { BLOCK_NUMBERS, USER_TOKEN_LIST } from "@/constants/storageKey"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBlockNumbers from "@/hooks/useBlockNumbers"
import useClaimHistory from "@/hooks/useClaimHistory"
import useTxHistory, { TxHistory } from "@/hooks/useTxHistory"
import { isAlternativeGasTokenEnabled } from "@/utils/common"
import { loadState } from "@/utils/localStorage"

type BridgeContextProps = {
  networksAndSigners: any
  txHistory: TxHistory
  blockNumbers: number[]
  tokenList: Token[]
  claimHistory: TxHistory
  refreshTokenList: () => void
}

const BridgeContext = createContext<BridgeContextProps | undefined>(undefined)

const BridgeContextProvider = ({ children }: any) => {
  const { provider, walletCurrentAddress, chainId } = useRainbowContext()
  const { isL1Available, isL2Available } = useBlockNumbers()

  const [blockNumbers] = useStorage(localStorage, BLOCK_NUMBERS, [-1, -1])
  const [tokenList, setTokenList] = useState<Token[]>([])

  const [networksAndSigners, setNetworksAndSigners] = useState({
    [CHAIN_ID.L1]: {},
    [CHAIN_ID.L2]: {},
  })

  const [fetchTokenListError, setFetchTokenListError] = useState("")

  const txHistory = useTxHistory()
  const claimHistory = useClaimHistory()

  // TODO: need refactoring inspired by publicClient and walletClient
  const update = async (walletProvider?: BrowserProvider, address?: string) => {
    let l1signer,
      l2signer,
      l1Gateway,
      l2Gateway,
      l1Provider,
      l2Provider,
      l1ProviderForSafeBlock,
      l1ScrollMessenger,
      l2ScrollMessenger,
      l1WrappedTokenGateway,
      l1GasTokenGateway
    if (!walletProvider || !address || (chainId !== CHAIN_ID.L1 && chainId !== CHAIN_ID.L2)) {
      l1Provider = await new JsonRpcProvider(RPC_URL.L1)
      l2Provider = await new JsonRpcProvider(RPC_URL.L2)
    } else if (chainId === CHAIN_ID.L1) {
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
    }
    // TODO: publicProvider
    l1ProviderForSafeBlock = await new JsonRpcProvider(RPC_URL.L1)
    l1ScrollMessenger = new ethers.Contract(SCROLL_MESSENGER_ADDR[CHAIN_ID.L1], L1_SCROLL_MESSENGER_ABI, l1signer)
    l2ScrollMessenger = new ethers.Contract(SCROLL_MESSENGER_ADDR[CHAIN_ID.L2], L2_SCROLL_MESSENGER_ABI, l2signer)

    if (isAlternativeGasTokenEnabled) {
      l1WrappedTokenGateway = new ethers.Contract(WRAPPED_TOKEN_GATEWAY_ADDR[CHAIN_ID.L1], L1_WRAPPED_TOKEN_GATEWAY_ABI, l1signer)
      l1GasTokenGateway = new ethers.Contract(GAS_TOKEN_GATEWAY[CHAIN_ID.L1], L1_GAS_TOKEN_GATEWAY_ABI, l1signer)
    }

    setNetworksAndSigners({
      [CHAIN_ID.L1]: {
        provider: l1Provider,
        signer: l1signer,
        gateway: l1Gateway,
        scrollMessenger: l1ScrollMessenger,
        wrappedTokenGateway: l1WrappedTokenGateway,
        gasTokenGateway: l1GasTokenGateway,
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

  const loadLocalTokenList = () => {
    const currentUserTokens = loadState(USER_TOKEN_LIST) || []

    const combinedList = [...NATIVE_TOKEN_LIST, ...currentUserTokens]
    const uniqueList = combinedList.reduce(
      (accumulator, token) => {
        if (!token.address) {
          accumulator.result.push(token)
          return accumulator
        }
        const lowercaseAddress = token.address.toLowerCase()
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
  }

  useEffect(() => {
    setTokenList(loadLocalTokenList())
  }, [])

  const refreshTokenList = () => {
    setTokenList(loadLocalTokenList())
  }

  useEffect(() => {
    if (provider && walletCurrentAddress) {
      update(provider, walletCurrentAddress)
    } else {
      update()
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
