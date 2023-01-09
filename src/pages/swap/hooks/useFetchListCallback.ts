import { nanoid } from "@reduxjs/toolkit"
import { TokenList } from "@uniswap/token-lists"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { ChainId } from "uniswap-v2-sdk-scroll"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"

import { AppDispatch } from "../state"
import { fetchTokenList } from "../state/lists/actions"
import getTokenList from "../utils/getTokenList"
import { getProvider } from "../utils/provider"
import resolveENSContentHash from "../utils/resolveENSContentHash"

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? "1")

const NETWORK_URL = "https://mainnet.infura.io/v3/099fc58e0de9451d80b18d7c74caa7c1" // TODO: Refactor

export function useFetchListCallback(): (listUrl: string) => Promise<TokenList> {
  const { chainId, provider } = useWeb3Context()
  const dispatch = useDispatch<AppDispatch>()
  // only if user add token with ENS name
  const ensResolver = useCallback(
    (ensName: string) => {
      if (!provider || chainId !== ChainId.MAINNET) {
        if (NETWORK_CHAIN_ID === ChainId.MAINNET) {
          const networkProvider = getProvider(NETWORK_CHAIN_ID, NETWORK_URL)
          if (networkProvider) {
            return resolveENSContentHash(ensName, networkProvider)
          }
        }
        throw new Error("Could not construct mainnet ENS resolver")
      }
      return resolveENSContentHash(ensName, provider!)
    },
    [chainId, provider],
  )

  return useCallback(
    async (listUrl: string) => {
      const requestId = nanoid()
      dispatch(fetchTokenList.pending({ requestId, url: listUrl }))
      return getTokenList(listUrl, ensResolver)
        .then(tokenList => {
          dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }))
          return tokenList
        })
        .catch(error => {
          console.debug(`Failed to get list at url ${listUrl}`, error)
          dispatch(
            fetchTokenList.rejected({
              url: listUrl,
              requestId,
              errorMessage: error.message,
            }),
          )
          throw error
        })
    },
    [dispatch, ensResolver],
  )
}
