import { BrowserProvider, JsonRpcProvider, JsonRpcSigner, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"
import useStorage from "squirrel-gill"
import useSWR from "swr"

import { Alert, Snackbar } from "@mui/material"

import { tokenListUrl } from "@/apis/dynamic"
import L1_ERC721_GATEWAY_ABI from "@/assets/abis/L1_ERC721_GATEWAY.json"
import L1_ERC1155_GATEWAY_ABI from "@/assets/abis/L1_ERC1155_GATEWAY.json"
import L1_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L1_GATEWAY_ROUTER_PROXY_ADDR.json"
import L2_ERC721_GATEWAY_ABI from "@/assets/abis/L2_ERC721_GATEWAY.json"
import L2_ERC1155_GATEWAY_ABI from "@/assets/abis/L2_ERC1155_GATEWAY.json"
import L2_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L2_GATEWAY_ROUTER_PROXY_ADDR.json"
import { ChainId, ETH_SYMBOL, GatewayRouterProxyAddr, RPCUrl } from "@/constants"
import { Token, nativeTokenList, networks } from "@/constants/networks"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useTxHistory, { TxHistory } from "@/hooks/useTxHistory"
import { requireEnv } from "@/utils"
import { BRIDGE_TOKEN_SYMBOL } from "@/utils/storageKey"

type AppContextProps = {
  networks: any[]
  networksAndSigners: any
  txHistory: TxHistory
  tokenList: Token[]
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

const branchName = requireEnv("REACT_APP_SCROLL_ENVIRONMENT").toLocaleLowerCase()

const AppContextProvider = ({ children }: any) => {
  const { provider, walletCurrentAddress, chainId } = useWeb3Context()
  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)
  const [networksAndSigners, setNetworksAndSigners] = useState({
    [ChainId.SCROLL_LAYER_1]: {},
    [ChainId.SCROLL_LAYER_2]: {},
  })

  const [fetchTokenListError, setFetchTokenListError] = useState("")

  const txHistory = useTxHistory(networksAndSigners)

  const update = async (web3Provider: BrowserProvider, address: string) => {
    let l1signer,
      l2signer,
      l1Gateway,
      l2Gateway,
      l1Provider,
      l2Provider,
      l1ProviderForSafeBlock,
      l1Gateway_721,
      l2Gateway_721,
      l1Gateway_1155,
      l2Gateway_1155

    if (chainId === ChainId.SCROLL_LAYER_1) {
      l1Provider = web3Provider
      l2Provider = await new JsonRpcProvider(RPCUrl.SCROLL_LAYER_2)
      l1signer = await web3Provider.getSigner(0)
      l2signer = new JsonRpcSigner(l2Provider, address)
      l1Gateway = new ethers.Contract(GatewayRouterProxyAddr[ChainId.SCROLL_LAYER_1], L1_GATEWAY_ROUTER_PROXY_ABI, l1signer)
      l1Gateway_721 = new ethers.Contract(GatewayRouterProxyAddr[`${ChainId.SCROLL_LAYER_1}_721`], L1_ERC721_GATEWAY_ABI, l1signer)
      l1Gateway_1155 = new ethers.Contract(GatewayRouterProxyAddr[`${ChainId.SCROLL_LAYER_1}_1155`], L1_ERC1155_GATEWAY_ABI, l1signer)
    } else if (chainId === ChainId.SCROLL_LAYER_2) {
      l1Provider = await new JsonRpcProvider(RPCUrl.SCROLL_LAYER_1)
      l2Provider = web3Provider
      l1signer = new JsonRpcSigner(l1Provider, address)
      l2signer = await web3Provider.getSigner(0)
      l2Gateway = new ethers.Contract(GatewayRouterProxyAddr[ChainId.SCROLL_LAYER_2], L2_GATEWAY_ROUTER_PROXY_ABI, l2signer)
      l2Gateway_721 = new ethers.Contract(GatewayRouterProxyAddr[`${ChainId.SCROLL_LAYER_2}_721`], L2_ERC721_GATEWAY_ABI, l2signer)
      l2Gateway_1155 = new ethers.Contract(GatewayRouterProxyAddr[`${ChainId.SCROLL_LAYER_2}_1155`], L2_ERC1155_GATEWAY_ABI, l2signer)
    } else {
      l1Provider = await new JsonRpcProvider(RPCUrl.SCROLL_LAYER_1)
      l2Provider = await new JsonRpcProvider(RPCUrl.SCROLL_LAYER_2)
    }
    // TODO: probable cause: getBlock("safe") in ethers 5.7.0 but web3-onboard use 5.3.2
    l1ProviderForSafeBlock = await new JsonRpcProvider(RPCUrl.SCROLL_LAYER_1)

    setNetworksAndSigners({
      [ChainId.SCROLL_LAYER_1]: {
        network: networks[0],
        provider: l1Provider,
        signer: l1signer,
        gateway: l1Gateway,
        gateway_721: l1Gateway_721,
        gateway_1155: l1Gateway_1155,
      },
      [`${ChainId.SCROLL_LAYER_1}ForSafeBlock`]: {
        provider: l1ProviderForSafeBlock,
      },
      [ChainId.SCROLL_LAYER_2]: {
        network: networks[1],
        provider: l2Provider,
        signer: l2signer,
        gateway: l2Gateway,
        gateway_721: l2Gateway_721,
        gateway_1155: l2Gateway_1155,
      },
    })
  }

  const { data: tokenList } = useSWR(tokenListUrl(branchName), url => {
    return scrollRequest(url)
      .then((data: any) => {
        const filteredList = data.tokens
        return [...nativeTokenList, ...filteredList]
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
        networks,
        networksAndSigners,
        txHistory,
        tokenList: tokenList ?? nativeTokenList,
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
  if (ctx === undefined) {
    throw new Error("useApp must be used within AppProvider")
  }
  return ctx
}

export default AppContextProvider
