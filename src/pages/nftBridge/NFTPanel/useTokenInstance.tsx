import { ethers } from "ethers"
import { useMemo } from "react"

import L1_ERC721 from "@/assets/abis/L1_ERC721.json"
import L1_ERC1155 from "@/assets/abis/L1_ERC1155.json"
import L2_ERC721 from "@/assets/abis/L2_ERC721.json"
import L2_ERC1155 from "@/assets/abis/L2_ERC1155.json"
import { TOEKN_TYPE } from "@/constants"
import { ChainId } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

const useTokenInstance = contract => {
  const { provider, checkConnectedChainId } = useWeb3Context()

  const tokenInstance = useMemo(() => {
    const signer = provider?.getSigner(0)
    if (contract?.type === TOEKN_TYPE[721] && checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
      return new ethers.Contract(contract.l1, L1_ERC721, signer)
    } else if (contract?.type === TOEKN_TYPE[721] && checkConnectedChainId(ChainId.SCROLL_LAYER_2)) {
      return new ethers.Contract(contract.l2, L2_ERC721, signer)
    } else if (contract?.type === TOEKN_TYPE[1155] && checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
      return new ethers.Contract(contract.l1, L1_ERC1155, signer)
    } else if (contract?.type === TOEKN_TYPE[1155] && checkConnectedChainId(ChainId.SCROLL_LAYER_2)) {
      return new ethers.Contract(contract.l2, L2_ERC1155, signer)
    }
    return {}
  }, [provider, checkConnectedChainId, contract?.type])

  return tokenInstance
}

export default useTokenInstance
