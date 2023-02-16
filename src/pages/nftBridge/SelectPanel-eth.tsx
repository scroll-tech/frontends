import { ethers } from "ethers"
import { useMemo } from "react"

import { Button } from "@mui/material"

import ERC721ABI from "@/assets/abis/ERC721ABI.json"
import ERC1155ABI from "@/assets/abis/ERC1155ABI.json"
import ERC721GatewayABI from "@/assets/abis/L1ERC721Gateway.json"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { requireEnv } from "@/utils"

const GATEWAY_721 = requireEnv("REACT_APP_L1_ERC721_GATEWAY_PROXY_ADDR")
// const IMPLEMENTATION_721 = requireEnv("REACT_APP_L1_ERC721_IMPLEMENTATION_PROXY_ADDR")

// 721
// L1: 0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b
// L2: 0x248e3033DD046C5799b55dDE97497b4f007D4A31

// 1155
// L1: 0x503ac85cfab61a1e33df33c8b26ae81e3c6e3ef2
// L2: 0x8FF3695Aca0978a1DcCD0Bf4E7f09EAE63bfeb43

const SelectPanel = () => {
  const { provider, walletCurrentAddress } = useWeb3Context()

  // useEffect(() => {
  //   getOwnedNfts()
  // }, [])

  const instance721 = useMemo(() => {
    const signer = provider?.getSigner(0)
    return new ethers.Contract("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b", ERC721ABI, signer)
  }, [provider])

  // https://etherscan.io/address/0x495f947276749ce646f68ac8c248420045cb7b5e
  const instance1155 = useMemo(() => {
    const signer = provider?.getSigner(0)
    return new ethers.Contract("0x503ac85cfab61a1e33df33c8b26ae81e3c6e3ef2", ERC1155ABI, signer)
  }, [provider])

  const instanceBridge721 = useMemo(() => {
    const signer = provider?.getSigner(0)
    return new ethers.Contract(GATEWAY_721, ERC721GatewayABI, signer)
  }, [provider])

  const getOwned721Nfts = async () => {
    console.log("getOwnedNfts")
    const count = await instance721["balanceOf(address)"](walletCurrentAddress)
    console.log(count.toNumber(), "count")
    for (let i = 0; i < count.toNumber(); i++) {
      const tokenId = await instance721["tokenOfOwnerByIndex(address,uint256)"](walletCurrentAddress, i)
      console.log(tokenId, "tokenId")
      // const tokenURI = await instance721["tokenURI(uint256)"](tokenId)
      // console.log(tokenURI)
    }
  }

  const setURI = async () => {
    await instance1155["setURI(string)"]("https://token-cdn-domain/{id}.json")
  }

  const getTokenURI = async () => {
    const uri = await instance1155["uri(uint256)"](3)
    console.log(uri, "uri")
  }
  const getOwned1155Nfts = async () => {
    console.log("getOwnedNfts")
    const count = await instance1155["balanceOf(address,uint256)"](walletCurrentAddress, 4)
    console.log(count.toNumber(), "tokenId=0->count")
  }

  // "0xf48156a81ad55fcab9b1b6a0f7b1c859008acdb9f0a423168b948349d15e8ceb"
  const approve721 = async () => {
    const tx = await instance721["setApprovalForAll(address,bool)"](GATEWAY_721, true)
    const txResult = await tx.wait()
    console.log("approve 721 succes", txResult)
  }

  const send721 = async () => {
    const tx = await instanceBridge721["depositERC721(address,uint256,uint256)"]("0xAe2865987b6bE23675A44934B601533CE768721D", 0, 0)
    const txResult = await tx.wait()
    console.log(txResult)
  }

  //   const ERC1155InterfaceId: string = "0xd9b67a26";
  // const ERC721InterfaceId: string = "0x80ac58cd";
  const check1155 = async () => {
    const res = await instance1155["supportsInterface(bytes4)"]("0xd9b67a26")
    console.log(res, "is 1155")
  }

  return (
    <div>
      <Button onClick={getOwned721Nfts}>Get Owned 721 NFTs</Button>

      <Button onClick={setURI}>Set 1155 URI</Button>
      <Button onClick={getTokenURI}>Get 1155 tokenId=0 uri</Button>
      {/* <Button onClick={getOwned721Nfts}>Get Owned NFTs</Button> */}
      <Button onClick={getOwned1155Nfts}>Get Owned 1155 NFTs</Button>

      <Button onClick={approve721}>Approve 721</Button>
      <Button onClick={send721}>Send 721</Button>

      <Button onClick={check1155}>check is 1155</Button>
    </div>
  )
}

export default SelectPanel
