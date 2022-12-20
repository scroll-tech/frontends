import { useEffect, useState } from "react"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

export default function useIsSmartContractWallet() {
  const { provider, walletCurrentAddress } = useWeb3Context()
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
