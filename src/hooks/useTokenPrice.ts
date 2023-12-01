import useSWR from "swr"

import { CHAIN_ID } from "@/constants"

const useTokenPrice = tokenList => {
  const fetchPrice = async () => {
    try {
      const tokens = tokenList.filter(token => token.chainId === CHAIN_ID.L1 && token.address).map(token => token.address)
      const tokenAddresses = tokens.join("%2C")

      const fetchEthPrice = fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
      const fetchErc20Price = fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses}&vs_currencies=usd`,
      )

      const [ethPriceResponse, erc20PriceResponse] = await Promise.all([fetchEthPrice, fetchErc20Price])

      if (!ethPriceResponse.ok || !erc20PriceResponse.ok) {
        throw new Error("Failed to fetch token prices")
      }

      const ethPrice = await ethPriceResponse.json()
      const erc20Price = await erc20PriceResponse.json()

      return { ...ethPrice, ...erc20Price }
    } catch (error) {
      throw error
    }
  }

  const { data, error, isValidating } = useSWR(tokenList ? "tokenPrice" : null, fetchPrice, { refreshInterval: 300000 })

  return {
    loading: isValidating,
    price: data,
    error,
  }
}

export default useTokenPrice
