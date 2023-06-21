import { useWeb3Context } from "@/contexts/Web3ContextProvider"

const useNFTApprove = () => {
  const { walletCurrentAddress } = useWeb3Context()

  const setApproval = async (tokenInstance, operatorAddress) => {
    const tx = await tokenInstance["setApprovalForAll(address,bool)"](operatorAddress, true)
    const txResult = await tx.wait()
    return txResult
  }

  const checkApproval = async (tokenInstance, operatorAddress) => {
    const isApproved = await tokenInstance["isApprovedForAll(address,address)"](walletCurrentAddress, operatorAddress)
    return isApproved
  }

  return { setApproval, checkApproval }
}

export default useNFTApprove
