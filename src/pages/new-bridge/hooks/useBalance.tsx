import { useBalance as useBalance_RAW } from "wagmi"

import { useRainbowContext } from "@/contexts/RainbowProvider"

const useBalance = tokenAddress => {
  const { walletCurrentAddress } = useRainbowContext()

  const { data, isLoading } = useBalance_RAW({ address: walletCurrentAddress, token: tokenAddress, watch: true })

  console.log("useBalance_RAW", "tokenAddress", data)

  return { balance: data?.value, isLoading }
}

export default useBalance
