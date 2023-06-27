import { useEffect, useState } from "react"

import { useRainbowContext } from "@/contexts/RainbowProvider"

export default function useIsSmartContractWallet() {
  const { provider, walletCurrentAddress } = useRainbowContext()
  const [isSmartContractWallet, setIsSmartContractWallet] = useState(false)

  useEffect(() => {
    const checkAddress = async () => {
      if (!provider || !walletCurrentAddress) return

      const code = await provider.getCode(walletCurrentAddress)
      setIsSmartContractWallet(code !== "0x")
    }

    checkAddress()
  }, [provider, walletCurrentAddress])

  return {
    isSmartContractWallet,
  }
}
