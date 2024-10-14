import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"
import Img from "react-cool-img"

import ERC721ABI from "@/assets/abis/ERC721ABI.json"
import ERC1155ABI from "@/assets/abis/ERC1155ABI.json"
import { TOEKN_TYPE } from "@/constants"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import { ipfsToBrowserURL } from "@/utils"

const NFTAvatar = props => {
  const { contractType, contractAddress, tokenId } = props
  const { publicProvider } = useCanvasContext()

  const { data, isLoading } = useQuery({
    queryKey: [tokenId, contractAddress, contractType],
    queryFn: async () => {
      const currentTokenId = BigInt(tokenId)
      let tokenURI
      if (contractType === TOEKN_TYPE[721]) {
        const tokenInstance = new ethers.Contract(contractAddress, ERC721ABI, publicProvider)
        tokenURI = await tokenInstance.tokenURI(currentTokenId)
      } else {
        const tokenInstance = new ethers.Contract(contractAddress, ERC1155ABI, publicProvider)
        const tokenURI1155 = await tokenInstance.uri(currentTokenId)

        // tokenURI = tokenURI1155.replace(/0x{id}/, tokenId)
        tokenURI = tokenURI1155.replace(/{id}/, tokenId)
      }

      const metadataURL = ipfsToBrowserURL(tokenURI)
      const { image } = await scrollRequest(metadataURL)
      return ipfsToBrowserURL(image)
    },
  })

  return (
    <Img
      src={isLoading ? "/imgs/canvas/badgePlaceholder.svg" : data || "/imgs/canvas/NFTPlaceholder.svg"}
      alt="NFT avatar"
      style={{ aspectRatio: "1 / 1", width: "100%", borderRadius: "0.8rem", objectFit: "contain" }}
      placeholder="/imgs/canvas/badgePlaceholder.svg"
    ></Img>
  )
}

export default NFTAvatar
