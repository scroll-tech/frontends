import { useRainbowContext } from "@/contexts/RainbowProvider"

const useApprove = token => {
  const { provider } = useRainbowContext()

  const checkApproval = async (amount: bigint, token: any, spender: string) => {
    try {
      const signer = await provider?.getSigner()
      const address = signer?.getAddress()?.toString()
      if (!signer) {
        throw new Error("Wallet not connected")
      }

      if (token.native) {
        return false
      }

      const approved = await token.allowance(address, spender)
      if (approved >= amount) {
        return false
      }

      return true
    } catch (err) {
      return false
    }
  }

  return { checkApproval }
}

export default useApprove
