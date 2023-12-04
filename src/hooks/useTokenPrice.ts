import { useState } from "react"
import useSWR from "swr"

import { CHAIN_ID } from "@/constants"

const useTokenPrice = tokenList => {
  const [prices, setPrices] = useState({})

  const fetchPrice = async () => {
    try {
      const tokens = tokenList.filter(token => token.chainId === CHAIN_ID.L1 && token.address).map(token => token.address)
      const tokenAddresses = tokens.join("%2C")

      const fetchEthPrice = fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
      const fetchErc20Price = fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses}&vs_currencies=usd`,
      )

      const results = await Promise.allSettled([fetchEthPrice, fetchErc20Price])

      let ethPrice = {}
      let erc20Price = {}

      if (results[0].status === "fulfilled" && results[0].value.ok) {
        ethPrice = await results[0].value.json()
      }

      if (results[1].status === "fulfilled" && results[1].value.ok) {
        erc20Price = await results[1].value.json()
      }

      const newPrices = { ...prices, ...ethPrice, ...erc20Price }
      setPrices(newPrices)
      return newPrices
    } catch (error) {
      throw error
    }
  }

  const { data, error, isValidating } = useSWR(tokenList ? "tokenPrice" : null, fetchPrice, { refreshInterval: 5 * 60 * 1000 })

  return {
    loading: isValidating,
    price: data || prices,
    error,
  }
}

export default useTokenPrice
