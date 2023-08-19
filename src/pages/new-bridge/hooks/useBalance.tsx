import { useBalance as useBalance_RAW } from "wagmi"

import { useRainbowContext } from "@/contexts/RainbowProvider"

const useBalance = tokenAddress => {
  const { walletCurrentAddress } = useRainbowContext()

  const { data } = useBalance_RAW({ address: walletCurrentAddress, token: tokenAddress })

  return data?.value
}

export default useBalance
