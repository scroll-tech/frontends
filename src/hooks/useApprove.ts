import { useRainbowContext } from "@/contexts/RainbowProvider"

const useApprove = token => {
  const { walletCurrentAddress, provider } = useRainbowContext()

  const checkApproval = async (amount: bigint, tokenInstance: any, spender: string) => {
    try {
      const signer = await provider?.getSigner()
      if (!signer) {
        throw new Error("Wallet not connected")
      }

      if (token.native) {
        return false
      }

      const approved = await tokenInstance.allowance(walletCurrentAddress, spender)
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
