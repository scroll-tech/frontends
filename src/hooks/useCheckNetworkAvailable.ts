import { CHAIN_ID } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useAsyncMemo } from "@/hooks"

const useCheckNetworkAvailable = () => {
  const { networksAndSigners } = useApp()

  const checkNetworkAvailable = async provider => {
    try {
      await provider.getNetwork()
      return true
    } catch (error) {
      console.error(`Network is not available: ${error.message}`)
      return false
    }
  }

  const isL1Available = useAsyncMemo(async () => {
    if (networksAndSigners[CHAIN_ID.L1]?.provider) {
      return await checkNetworkAvailable(networksAndSigners[CHAIN_ID.L1].provider)
    }
    return true
  }, [networksAndSigners[CHAIN_ID.L1]])

  const isL2Available = useAsyncMemo(async () => {
    if (networksAndSigners[CHAIN_ID.L2]?.provider) {
      return await checkNetworkAvailable(networksAndSigners[CHAIN_ID.L2].provider)
    }
    return true
  }, [networksAndSigners[CHAIN_ID.L2]])

  return { isL1Available, isL2Available }
}

export default useCheckNetworkAvailable
