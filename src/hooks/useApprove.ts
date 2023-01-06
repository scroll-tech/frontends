import { BigNumber } from "ethers"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"

const useApprove = token => {
  const { provider } = useWeb3Context()

  const checkApproval = async (amount: BigNumber, token: any, spender: string) => {
    try {
      const signer = provider?.getSigner()
      const address = (await signer?.getAddress())?.toString()
      if (!signer) {
        throw new Error("Wallet not connected")
      }

      if (token.native) {
        return false
      }

      const approved = await token.allowance(address, spender)
      if (approved.gte(amount)) {
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
