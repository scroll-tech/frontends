import { BrowserProvider, JsonRpcProvider, JsonRpcSigner, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"
import useStorage from "squirrel-gill"
import useSWR from "swr"

import { Alert, Snackbar } from "@mui/material"

import { tokenListUrl } from "@/apis/dynamic"
import L1_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L1_GATEWAY_ROUTER_PROXY_ADDR.json"
import L2_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L2_GATEWAY_ROUTER_PROXY_ADDR.json"
import { CHAIN_ID, ETH_SYMBOL, GATEWAY_ROUTE_PROXY_ADDR, NATIVE_TOKEN_LIST, RPC_URL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useClaim from "@/hooks/useClaim"
import useTxHistory, { TxHistory } from "@/hooks/useTxHistory"
import { requireEnv } from "@/utils"

type AppContextProps = {
  networksAndSigners: any
  txHistory: TxHistory
  tokenList: Token[]
  claim: any
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

const branchName = requireEnv("REACT_APP_SCROLL_ENVIRONMENT").toLocaleLowerCase()

const AppContextProvider = ({ children }: any) => {
  const { provider, walletCurrentAddress, chainId } = useRainbowContext()
  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)
  const [networksAndSigners, setNetworksAndSigners] = useState({
    [CHAIN_ID.L1]: {},
    [CHAIN_ID.L2]: {},
  })

  const [fetchTokenListError, setFetchTokenListError] = useState("")

  const txHistory = useTxHistory(networksAndSigners)
  const claim = useClaim(networksAndSigners)

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

  const { data: tokenList } = useSWR(tokenListUrl(branchName), url => {
    return scrollRequest(url)
      .then((data: any) => {
        const filteredList = data.tokens
        return [...NATIVE_TOKEN_LIST, ...filteredList]
      })
      .catch(() => {
        setFetchTokenListError("Fail to fetch token list")
        setTokenSymbol(ETH_SYMBOL)
        return null
      })
  })

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
    <AppContext.Provider
      value={{
        networksAndSigners,
        txHistory,
        claim,
        tokenList: tokenList ?? NATIVE_TOKEN_LIST,
      }}
    >
      {children}
      {/* TODO: unify error reporting */}
      <Snackbar open={!!fetchTokenListError} autoHideDuration={null} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ ".MuiAlert-action": { padding: "0 0.8rem" } }}>
          {fetchTokenListError}
        </Alert>
      </Snackbar>
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider")
  }
  return ctx
}

export default AppContextProvider
