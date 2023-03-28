import { ethers } from "ethers"
import { useMemo, useState } from "react"
import useSWR from "swr"

import { Button } from "@mui/material"
import { Stack } from "@mui/system"

import { nftTokenListUrl } from "@/apis/dynamic"
import L1_ERC721 from "@/assets/abis/L1_ERC721.json"
import L1_ERC1155 from "@/assets/abis/L1_ERC1155.json"
import L2_ERC721 from "@/assets/abis/L2_ERC721.json"
import L2_ERC1155 from "@/assets/abis/L2_ERC1155.json"
import { ChainId, GasLimit } from "@/constants"
import { TOEKN_TYPE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useGasFee from "@/hooks/useGasFee"
import useApprove from "@/hooks/useNFTApprove"
import { requireEnv } from "@/utils"

import ContractSelect from "../components/ContractSelect"
import TokenIdInput from "../components/TokenIdInput"
import Gallery from "./Gallery"

// lost tokenId: 1364061

const L1_721 = requireEnv("REACT_APP_L1_SCROLL721_ADDRESS")
const L2_721 = requireEnv("REACT_APP_L2_SCROLL721_ADDRESS")

const L1_1155 = requireEnv("REACT_APP_L1_SCROLL1155_ADDRESS")
const L2_1155 = requireEnv("REACT_APP_L2_SCROLL1155_ADDRESS")

// TODO: sole approve
const GATEWAY_721_L1 = requireEnv("REACT_APP_L1_ERC721_GATEWAY_PROXY_ADDR")
const GATEWAY_721_L2 = requireEnv("REACT_APP_L2_ERC721_GATEWAY_PROXY_ADDR")

const GATEWAY_1155_L1 = requireEnv("REACT_APP_L1_ERC1155_GATEWAY_PROXY_ADDR")
const GATEWAY_1155_L2 = requireEnv("REACT_APP_L2_ERC1155_GATEWAY_PROXY_ADDR")

// const contractList = [
//   {
//     type: "ERC721",
//     l1: "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b",
//     l2: "0xc08632f77736AbbA71356C04dd6af28987B99E8E",
//   },
//   { type: "ERC1155", l1: "0x2e3ef7931f2d0e4a7da3dea950ff3f19269d9063", l2: "0x1A7eb82efB17ddB5B72A9E5313983FB90703C502" },
// ]

const branchName = requireEnv("REACT_APP_SCROLL_ENVIRONMENT").toLocaleLowerCase()

const SelectPanel = () => {
  const { provider, walletCurrentAddress, checkConnectedChainId } = useWeb3Context()
  const { networksAndSigners } = useApp()
  const { setApproval, checkApproval } = useApprove()
  const [contract, setContract] = useState<any>({})
  const [currentTokenId, setCurrentTokenId] = useState(123)

  const { getGasFee } = useGasFee()

  const { data: contractList } = useSWR(nftTokenListUrl(branchName), url => {
    return scrollRequest(url)
      .then((data: any) => {
        setContract(data.tokens[0])

        return data.tokens
      })
      .catch(() => {
        // setFetchTokenListError("Fail to fetch token list")
        // setTokenSymbol(ETH_SYMBOL)
        return []
      })
  })

  const tokenInstance = useMemo(() => {
    const signer = provider?.getSigner(0)
    if (contract?.type === TOEKN_TYPE[721] && checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
      return new ethers.Contract(L1_721, L1_ERC721, signer)
    } else if (contract?.type === TOEKN_TYPE[721] && checkConnectedChainId(ChainId.SCROLL_LAYER_2)) {
      return new ethers.Contract(L2_721, L2_ERC721, signer)
    } else if (contract?.type === TOEKN_TYPE[1155] && checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
      return new ethers.Contract(L1_1155, L1_ERC1155, signer)
    } else if (contract?.type === TOEKN_TYPE[1155] && checkConnectedChainId(ChainId.SCROLL_LAYER_2)) {
      return new ethers.Contract(L2_1155, L2_ERC1155, signer)
    }
    return {}
  }, [provider, checkConnectedChainId, contract?.type])

  const getOwnedL1_721Nfts = async () => {
    console.log("getOwnedNfts", walletCurrentAddress)
    const count = await tokenInstance["balanceOf(address)"](walletCurrentAddress)
    console.log(count.toNumber(), "count")
    for (let i = 0; i < count.toNumber(); i++) {
      const tokenId = await tokenInstance["tokenOfOwnerByIndex(address,uint256)"](walletCurrentAddress, i)
      const tokenURI = await tokenInstance["tokenURI(uint256)"](tokenId)
      console.log(tokenId, tokenURI)
    }
  }

  const getOwnedL2_721Nfts = async () => {
    console.log("getOwnedNfts")
    const count = await tokenInstance["balanceOf(address)"](walletCurrentAddress)
    console.log(count.toNumber(), "count")
    for (let i = 0; i < count.toNumber(); i++) {
      const tokenId = await tokenInstance["tokenOfOwnerByIndex(address,uint256)"](walletCurrentAddress, i)
      const tokenURI = await tokenInstance["tokenURI(uint256)"](tokenId)
      console.log(tokenId.toNumber(), tokenURI)
    }
  }

  const getTokenURI = async () => {
    const uri = await tokenInstance["tokenURI(uint256)"](currentTokenId)
    console.log(uri, "isOwner")

    // const isOwner = await tokenInstance["ownerOf(uint256)"](currentTokenId)
    // console.log(isOwner, "isOwner")
  }

  const get1155TokenURI = async () => {
    const uri = await tokenInstance["uri(uint256)"](currentTokenId)
    console.log(uri, "uri")
  }

  const get1155Balance = async () => {
    const amount = await tokenInstance["balanceOf(address,uint256)"](walletCurrentAddress, currentTokenId)
    console.log(amount.toNumber(), "amount")
  }
  const setTokenURI = async () => {
    await tokenInstance["setTokenURI(uint256,string)"](
      currentTokenId,
      // "https://ipfs.io/ipfs/bafybeiezeds576kygarlq672cnjtimbsrspx5b3tr3gct2lhqud6abjgiu",
      "Dummy ERC1155",
    )
  }

  const approveDeposit = async () => {
    const gateway = contract.type === "ERC721" ? GATEWAY_721_L1 : GATEWAY_1155_L1
    const result = await setApproval(tokenInstance, gateway)
    console.log("approve success", result)
  }

  const deposite = () => {
    if (contract.type === "ERC721") {
      deposite721()
    } else if (contract.type === "ERC1155") {
      deposite1155()
    }
  }

  const deposite721 = async () => {
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway_721["batchDepositERC721(address,address,uint256[],uint256)"](
      L1_721,
      walletCurrentAddress,
      [currentTokenId],
      0,
    )
    const txResult = await tx.wait()
    console.log(txResult)
  }

  const deposite1155 = async () => {
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway_1155["batchDepositERC1155(address,address,uint256[],uint256[],uint256)"](
      L1_1155,
      walletCurrentAddress,
      [123],
      [1],
      0,
    )
    const txResult = await tx.wait()
    console.log(txResult)
  }

  const approveWithdraw = async () => {
    const gateway = contract.type === "ERC721" ? GATEWAY_721_L2 : GATEWAY_1155_L2
    const result = await setApproval(tokenInstance, gateway)
    console.log("approve withdraw success", result)
  }

  const withdraw = () => {
    if (contract.type === "ERC721") {
      withdraw721()
    } else if (contract.type === "ERC1155") {
      withdraw1155()
    }
  }

  const withdraw721 = async () => {
    const gasFee = await getGasFee(GasLimit.WITHDRAW_ERC721)
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

  const withdraw1155 = async () => {
    const gasFee = await getGasFee(GasLimit.WITHDRAW_ERC1155)
    const tx = await networksAndSigners[ChainId.SCROLL_LAYER_2].gateway_1155["batchWithdrawERC1155(address,address,uint256[],uint256[],uint256)"](
      L2_1155,
      walletCurrentAddress,
      [currentTokenId],
      [1],
      GasLimit.WITHDRAW_ERC1155,
      { value: gasFee },
    )
    const txResult = await tx.wait()
    console.log(txResult)
  }

  const handleEnsureToken = async () => {
    let uri
    if (contract?.type === 721) {
      uri = await tokenInstance["tokenURI(uint256)"](currentTokenId)
    } else {
      uri = await tokenInstance["uri(uint256)"](currentTokenId)
    }
    console.log(uri, "uri")
    // scrollRequest(uri).then(data => {
    //   addViewingList({ id: currentTokenId, ...data })
    // })
  }

  const handleChangeContract = value => {
    console.log(value, "value")
    setContract(value)
  }

  // const checkContrantType = async () => {
  //   const signer = provider?.getSigner(0)
  //   const instance = new ethers.Contract(contract.address, L1_ERC721, signer)
  //   const isERC721 = await instance["supportsInterface(bytes4)"]("0x80ac58cd")
  //   const isERC1155 = await instance["supportsInterface(bytes4)"]("0xd9b67a26")
  //   if (isERC721) {
  //     console.log("721")
  //   } else if (isERC1155) {
  //     console.log("1155")
  //   } else {
  //     console.log("no")
  //   }
  // }

  const handleCheckApproval = async () => {
    if (tokenInstance) {
      const gateway = contract.type === TOEKN_TYPE[721] ? GATEWAY_721_L2 : GATEWAY_1155_L2
      const isApproved = await checkApproval(tokenInstance, gateway)
      console.log(isApproved, "isApproved")
    }
  }

  return (
    <div>
      <ContractSelect value={contract} data={contractList || []} onChange={handleChangeContract}></ContractSelect>
      <TokenIdInput value={currentTokenId} onChange={setCurrentTokenId} onEnsure={handleEnsureToken}></TokenIdInput>
      <Gallery></Gallery>
      {checkConnectedChainId(ChainId.SCROLL_LAYER_1) ? (
        <Stack direction="column">
          <Button onClick={getOwnedL1_721Nfts}>Get Owned L1 721 NFTs</Button>
          <Button onClick={getTokenURI}>Get tokenId={currentTokenId} uri</Button>
          <Button onClick={approveDeposit}>Approve Deposite {contract?.type}</Button>
          <Button onClick={deposite}>Deposite {contract?.type}</Button>
        </Stack>
      ) : (
        <Stack direction="column">
          <Button onClick={getOwnedL2_721Nfts}>Get Owned L2 721 NFTs</Button>
          <Button onClick={setTokenURI}>
            Set {contract?.type} tokenId = {currentTokenId} URI
          </Button>

          <Button onClick={approveWithdraw}>Approve Withdraw {contract?.type}</Button>
          <Button onClick={withdraw}>Send Withdraw {contract?.type}</Button>
        </Stack>
      )}
      <Button onClick={get1155TokenURI}>Get 1155 token uri {currentTokenId}</Button>
      <Button onClick={get1155Balance}>Get 1155 balance of {currentTokenId}</Button>
      {/* <Button onClick={checkContrantType}>Check type</Button> */}

      <Button onClick={handleCheckApproval}>Check Approval</Button>
    </div>
  )
}

export default SelectPanel
