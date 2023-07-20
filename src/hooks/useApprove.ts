import { useRainbowContext } from "@/contexts/RainbowProvider"

const useApprove = token => {
  const { provider } = useRainbowContext()

  const checkApproval = async (amount: bigint, tokenInstance: any, spender: string) => {
    try {
      const signer = await provider?.getSigner()
      const address = await signer?.getAddress()
      if (!signer) {
        throw new Error("Wallet not connected")
      }

      if (token.native) {
        return false
      }

      const approved = await tokenInstance.allowance(address, spender)
      if (approved >= amount) {
        return false
      }

      return true
    } catch (err) {
      console.log("err", err)
      return false
    }
  }

  return { checkApproval }
}

export default useApprove
