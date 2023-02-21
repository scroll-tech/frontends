import { ethers } from "ethers"
import { useMemo } from "react"

import { Button } from "@mui/material"

import ERC721ABI from "@/assets/abis/ERC721ABI.json"
import ERC1155ABI from "@/assets/abis/ERC1155ABI.json"
import L1_ERC721GatewayABI from "@/assets/abis/L1ERC721Gateway.json"
import L2_ERC721GatewayABI from "@/assets/abis/L2ERC721Gateway.json"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { requireEnv } from "@/utils"

const L1_721 = requireEnv("REACT_APP_L1_SCROLL721_ADDRESS")
const L2_721 = requireEnv("REACT_APP_L2_SCROLL721_ADDRESS")

const L1_1155 = "0x1Ac9A1C44b751509569C60Edf98287C36F4590D2"
// const L2_1155 = "0x8FF3695Aca0978a1DcCD0Bf4E7f09EAE63bfeb43"

const GATEWAY_721_L1 = requireEnv("REACT_APP_L1_ERC721_GATEWAY_PROXY_ADDR")
const GATEWAY_721_L2 = requireEnv("REACT_APP_L2_ERC721_GATEWAY_PROXY_ADDR")

const SelectPanel = () => {
  const { provider, walletCurrentAddress } = useWeb3Context()

  const instanceL1_721 = useMemo(() => {
    const signer = provider?.getSigner(0)
    return new ethers.Contract(L1_721, ERC721ABI, signer)
  }, [provider])

  const instanceL2_721 = useMemo(() => {
    const signer = provider?.getSigner(0)
    return new ethers.Contract(L2_721, ERC721ABI, signer)
  }, [provider])

  const instance1155 = useMemo(() => {
    const signer = provider?.getSigner(0)
    return new ethers.Contract(L1_1155, ERC1155ABI, signer)
  }, [provider])

  const instanceBridge721_L1 = useMemo(() => {
    const signer = provider?.getSigner(0)
    return new ethers.Contract(GATEWAY_721_L1, L1_ERC721GatewayABI, signer)
  }, [provider])

  const instanceBridge721_L2 = useMemo(() => {
    const signer = provider?.getSigner(0)
    return new ethers.Contract(GATEWAY_721_L2, L2_ERC721GatewayABI, signer)
  }, [provider])

  const getOwnedL1_721Nfts = async () => {
    console.log("getOwnedNfts")
    const count = await instanceL1_721["balanceOf(address)"](walletCurrentAddress)
    console.log(count.toNumber(), "count")
    for (let i = 0; i < count.toNumber(); i++) {
      const tokenId = await instanceL1_721["tokenOfOwnerByIndex(address,uint256)"](walletCurrentAddress, i)
      const tokenURI = await instanceL1_721["tokenURI(uint256)"](tokenId)
      console.log(tokenId, tokenURI)
    }
  }

  const getOwnedL2_721Nfts = async () => {
    console.log("getOwnedNfts")
    const count = await instanceL2_721["balanceOf(address)"](walletCurrentAddress)
    console.log(count.toNumber(), "count")
    for (let i = 0; i < count.toNumber(); i++) {
      const tokenId = await instanceL2_721["tokenOfOwnerByIndex(address,uint256)"](walletCurrentAddress, i)
      const tokenURI = await instanceL2_721["tokenURI(uint256)"](tokenId)
      console.log(tokenId, tokenURI)
    }
  }

  const getTokenURI = async () => {
    const uri = await instanceL1_721["tokenURI(uint256)"](0)
    console.log(uri, "uri")
  }

  const setURI = async () => {
    await instance1155["setURI(string)"]("https://token-cdn-domain/{id}.json")
  }

  // const getTokenURI = async () => {
  //   const uri = await instance1155["uri(uint256)"](0)
  //   console.log(uri, "uri")
  // }
  const getOwned1155Nfts = async () => {
    console.log("getOwnedNfts")
    const count = await instance1155["balanceOf(address,uint256)"](walletCurrentAddress, 4)
    console.log(count.toNumber(), "tokenId=0->count")
  }

  // "0xf48156a81ad55fcab9b1b6a0f7b1c859008acdb9f0a423168b948349d15e8ceb"
  const approve721 = async () => {
    const tx = await instanceL1_721["setApprovalForAll(address,bool)"](GATEWAY_721_L1, true)
    const txResult = await tx.wait()
    console.log("approve 721 succes", txResult)
  }

  const send721 = async () => {
    const tx = await instanceBridge721_L1["depositERC721(address,address,uint256,uint256)"](L1_721, walletCurrentAddress, 0, 0)
    const txResult = await tx.wait()
    console.log(txResult)
  }

  //   const ERC1155InterfaceId: string = "0xd9b67a26";
  // const ERC721InterfaceId: string = "0x80ac58cd";
  const check1155 = async () => {
    const res = await instance1155["supportsInterface(bytes4)"]("0xd9b67a26")
    console.log(res, "is 1155")
  }

  const approveWithdraw721 = async () => {
    const tx = await instanceL2_721["setApprovalForAll(address,bool)"](GATEWAY_721_L2, true)
    const txResult = await tx.wait()
    console.log("approve 721 succes", txResult)
  }

  const withdraw721 = async () => {
    const tx = await instanceBridge721_L2["withdrawERC721(address,address,uint256,uint256)"](L2_721, walletCurrentAddress, 0, 0)
    const txResult = await tx.wait()
    console.log(txResult)
  }

  return (
    <div>
      <Button onClick={getOwnedL1_721Nfts}>Get Owned L1 721 NFTs</Button>
      <Button onClick={getOwnedL2_721Nfts}>Get Owned L2 721 NFTs</Button>

      <Button onClick={setURI}>Set 1155 URI</Button>
      <Button onClick={getTokenURI}>Get tokenId=0 uri</Button>
      {/* <Button onClick={getOwned721Nfts}>Get Owned NFTs</Button> */}
      <Button onClick={getOwned1155Nfts}>Get Owned 1155 NFTs</Button>

      <Button onClick={approve721}>Approve Deposite 721</Button>
      <Button onClick={send721}>Deposite 721</Button>

      <Button onClick={check1155}>check is 1155</Button>

      <Button onClick={approveWithdraw721}>Approve Withdraw 721</Button>
      <Button onClick={withdraw721}>Send Withdraw 721</Button>
    </div>
  )
}

export default SelectPanel
