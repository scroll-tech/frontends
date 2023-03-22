import { ethers } from "ethers"
import { useMemo, useState } from "react"

import { Button } from "@mui/material"
import { Stack } from "@mui/system"

import L1_ERC721ABI from "@/assets/abis/L1_ERC721ABI.json"
import L2_ERC721ABI from "@/assets/abis/L2_ERC721ABI.json"
import { ChainId, GasLimit } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useGasFee from "@/hooks/useGasFee"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { requireEnv } from "@/utils"

import ContractSelect from "../components/ContractSelect"
import TokenIdInput from "../components/TokenIdInput"
import Gallery from "./Gallery"

const L1_721 = requireEnv("REACT_APP_L1_SCROLL721_ADDRESS")
const L2_721 = requireEnv("REACT_APP_L2_SCROLL721_ADDRESS")

// TODO: sole approve
const GATEWAY_721_L1 = requireEnv("REACT_APP_L1_ERC721_GATEWAY_PROXY_ADDR")
const GATEWAY_721_L2 = requireEnv("REACT_APP_L2_ERC721_GATEWAY_PROXY_ADDR")

const SelectPanel = () => {
  const { provider, walletCurrentAddress, checkConnectedChainId } = useWeb3Context()
  const { networksAndSigners } = useApp()
  const { addViewingList } = useNFTBridgeStore()
  const [currentContract, setCurrentContract] = useState(L1_721)
  const [currentTokenId, setCurrentTokenId] = useState(1364061)

  const { getGasFee } = useGasFee()

  const instance = useMemo(() => {
    const signer = provider?.getSigner(0)
    if (checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
      return new ethers.Contract(L1_721, L1_ERC721ABI, signer)
    }
    return new ethers.Contract(L2_721, L2_ERC721ABI, signer)
  }, [provider, checkConnectedChainId])

  const getOwnedL1_721Nfts = async () => {
    console.log("getOwnedNfts", walletCurrentAddress)
    const count = await instance["balanceOf(address)"](walletCurrentAddress)
    console.log(count.toNumber(), "count")
    for (let i = 0; i < count.toNumber(); i++) {
      const tokenId = await instance["tokenOfOwnerByIndex(address,uint256)"](walletCurrentAddress, i)
      const tokenURI = await instance["tokenURI(uint256)"](tokenId)
      console.log(tokenId, tokenURI)
    }
  }

  const getOwnedL2_721Nfts = async () => {
    console.log("getOwnedNfts")
    const count = await instance["balanceOf(address)"](walletCurrentAddress)
    console.log(count.toNumber(), "count")
    for (let i = 0; i < count.toNumber(); i++) {
      const tokenId = await instance["tokenOfOwnerByIndex(address,uint256)"](walletCurrentAddress, i)
      const tokenURI = await instance["tokenURI(uint256)"](tokenId)
      console.log(tokenId.toNumber(), tokenURI)
    }
  }

  const getTokenURI = async () => {
    const uri = await instance["tokenURI(uint256)"](currentTokenId)
    console.log(uri, "uri")
  }

  const setTokenURI = async () => {
    await instance["setTokenURI(uint256,string)"](currentTokenId, "https://ipfs.io/ipfs/bafybeiezeds576kygarlq672cnjtimbsrspx5b3tr3gct2lhqud6abjgiu")
  }

  // "0xf48156a81ad55fcab9b1b6a0f7b1c859008acdb9f0a423168b948349d15e8ceb"
  const approve721 = async () => {
    const tx = await instance["setApprovalForAll(address,bool)"](GATEWAY_721_L1, true)
    const txResult = await tx.wait()
    console.log("approve 721 succes", txResult)
  }

  const send721 = async () => {
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway_721["batchDepositERC721(address,address,uint256[],uint256)"](
      L1_721,
      walletCurrentAddress,
      [currentTokenId],
      0,
    )
    const txResult = await tx.wait()
    console.log(txResult)
  }

  const approveWithdraw721 = async () => {
    const tx = await instance["setApprovalForAll(address,bool)"](GATEWAY_721_L2, true)
    const txResult = await tx.wait()
    console.log("approve 721 succes", txResult)
  }

  const withdraw721 = async () => {
    const gasFee = await getGasFee(GasLimit.WITHDRAW_ERC721)
    console.log(gasFee, "gasFee")
    // console.log(gasFee.toNumber(), "gasFee toNumber")
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_2].gateway_721["batchWithdrawERC721(address,address,uint256[],uint256)"](
      L2_721,
      walletCurrentAddress,
      [currentTokenId],
      GasLimit.WITHDRAW_ERC721,
      { value: gasFee },
    )
    const txResult = await tx.wait()
    console.log(txResult)
  }

  const handleEnsureToken = async () => {
    const uri = await instance["tokenURI(uint256)"](currentTokenId)
    console.log(uri, "uri")
    scrollRequest(uri).then(data => {
      addViewingList({ id: currentTokenId, ...data })
    })
  }

  return (
    <div>
      <ContractSelect value={currentContract} onChange={setCurrentContract}></ContractSelect>
      <TokenIdInput value={currentTokenId} onChange={setCurrentTokenId} onEnsure={handleEnsureToken}></TokenIdInput>
      <Gallery></Gallery>
      {checkConnectedChainId(ChainId.SCROLL_LAYER_1) ? (
        <Stack direction="column">
          <Button onClick={getOwnedL1_721Nfts}>Get Owned L1 721 NFTs</Button>
          <Button onClick={getTokenURI}>Get tokenId={currentTokenId} uri</Button>
          <Button onClick={approve721}>Approve Deposite 721</Button>
          <Button onClick={send721}>Deposite 721</Button>
        </Stack>
      ) : (
        <Stack direction="column">
          <Button onClick={getOwnedL2_721Nfts}>Get Owned L2 721 NFTs</Button>
          <Button onClick={setTokenURI}>Set 721 tokenId = {currentTokenId} URI</Button>

          <Button onClick={approveWithdraw721}>Approve Withdraw 721</Button>
          <Button onClick={withdraw721}>Send Withdraw 721</Button>
        </Stack>
      )}
    </div>
  )
}

export default SelectPanel
