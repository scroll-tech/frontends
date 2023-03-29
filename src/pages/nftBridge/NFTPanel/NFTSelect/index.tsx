import { useState } from "react"
import useSWR from "swr"

import { Box, InputBase, Stack, Typography } from "@mui/material"

import { nftTokenListUrl } from "@/apis/dynamic"
import { TOEKN_TYPE, networks } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { requireEnv, switchNetwork } from "@/utils"

import Button from "../../components/Button"
import ContractSelect from "../../components/ContractSelect"
import NetworkSelect from "../../components/NetworkSelect"
import Gallery from "../Gallery"
import useTokenInstance from "../useTokenInstance"

const branchName = requireEnv("REACT_APP_SCROLL_ENVIRONMENT").toLocaleLowerCase()

const NFTSelect = props => {
  const { network } = props
  const { walletCurrentAddress } = useWeb3Context()
  const { viewingList, addViewingList, clearViewingList, clearSelectedList, contract, changeContract } = useNFTBridgeStore()
  const tokenInstance = useTokenInstance(contract)

  const [currentTokenId, setCurrentTokenId] = useState<number>()

  const { data: contractList } = useSWR(
    nftTokenListUrl(branchName),
    url => {
      return scrollRequest(url)
        .then((data: any) => {
          if (!contract.type) {
            changeContract(data.tokens[0])
          }
          return data.tokens
        })
        .catch(() => {
          // setFetchTokenListError("Fail to fetch token list")
          // setTokenSymbol(ETH_SYMBOL)
          return []
        })
    },
    {
      revalidateOnFocus: false,
    },
  )

  const handleChangeContract = value => {
    changeContract(value)
    clearViewingList()
    clearSelectedList()
  }

  // TODO: tip for not owned/exists token
  const handleSearchToken = async () => {
    if (viewingList.find(item => item.id === currentTokenId)) {
      console.log("Duplicate TokenId!")
      return
    }
    let uri
    let amount = 1
    if (contract?.type === TOEKN_TYPE[721]) {
      const owned = await isOwned(currentTokenId)
      if (owned) {
        uri = await tokenInstance["tokenURI(uint256)"](currentTokenId)
      }
    } else {
      const exists = await isExists(currentTokenId)
      if (exists) {
        uri = await tokenInstance["uri(uint256)"](currentTokenId)
        amount = await tokenInstance["balanceOf(address,uint256)"](walletCurrentAddress, currentTokenId)
        amount = (amount as any).toNumber()
      }
    }
    // console.log(uri, "uri")

    if (uri && uri.startsWith("http")) {
      scrollRequest(uri).then(data => {
        addViewingList({ id: currentTokenId, amount, ...data, transferAmount: amount })
      })
    } else if (uri) {
      addViewingList({ id: currentTokenId, amount, name: uri, transferAmount: amount })
    }
  }

  const isOwned = async tokenId => {
    try {
      const owner = await tokenInstance["ownerOf(uint256)"](tokenId)
      return owner === walletCurrentAddress
    } catch (e) {
      return false
    }
  }
  const isExists = async tokenId => {
    try {
      const exists = await tokenInstance["exists(uint256)"](tokenId)
      return exists
    } catch (e) {
      return true
    }
  }

  const handleChangeFromNetwork = value => {
    console.log(value, "handleChangeFromNetwork")
    switchNetwork(value)
  }

  const handleChangeTokenId = e => {
    const { value } = e.target
    if (value) {
      setCurrentTokenId(isNaN(+value) ? undefined : +value)
    } else {
      setCurrentTokenId(undefined)
    }
  }

  // const get1155Balance = async () => {
  //   const amount = await tokenInstance["balanceOf(address,uint256)"](walletCurrentAddress, currentTokenId)
  //   console.log(amount.toNumber(), "amount")
  // }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: "6px", flex: 3, padding: "5rem 4rem" }}>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 400 }}>
          Select your NFTs on
        </Typography>
        <NetworkSelect
          placeholder="Select NFT'contract address"
          value={network.chainId}
          options={networks}
          onChange={handleChangeFromNetwork}
        ></NetworkSelect>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mt: "2.5rem" }}>
        <ContractSelect value={contract} data={contractList || []} onChange={handleChangeContract}></ContractSelect>
        <InputBase
          size="small"
          sx={{
            fontSize: "1.4rem",
            bgcolor: "#e0e0e0",
            borderRadius: "0.6rem",
            color: "#7e7e7e",
            padding: "0 1.2rem",
            ".MuiInputBase-input": {
              paddingBottom: 0,
            },
          }}
          placeholder="TOKEN ID"
          value={currentTokenId}
          onChange={handleChangeTokenId}
        />
        <Button sx={{ width: "7rem" }} onClick={handleSearchToken}>
          Search
        </Button>
      </Stack>
      <Gallery sx={{ mt: "2.5rem" }}></Gallery>

      {/* <Button onClick={get1155Balance}>Get 1155 balance of {currentTokenId}</Button> */}
    </Box>
  )
}

export default NFTSelect
