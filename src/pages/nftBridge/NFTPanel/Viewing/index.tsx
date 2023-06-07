import { useState } from "react"
import useSWR from "swr"

import { Box, InputBase, Stack, Typography } from "@mui/material"

import { nftTokenListUrl } from "@/apis/dynamic"
import { TOEKN_TYPE, networks } from "@/constants"
import { useNFTBridgeContext } from "@/contexts/NFTBridgeProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { requireEnv, switchNetwork } from "@/utils"

import ContractSelect from "../../components/ContractSelect"
import Gallery from "../../components/Gallery"
import ViewingItem from "../../components/Gallery/ViewingItem"
import NetworkSelect from "../../components/NetworkSelect"
import LoadingButton from "../../components/SearchButton"

const branchName = requireEnv("REACT_APP_SCROLL_ENVIRONMENT").toLocaleLowerCase()

const Viewing = props => {
  const { walletCurrentAddress } = useWeb3Context()
  const { tokenInstance } = useNFTBridgeContext()
  const { fromNetwork, viewingList, addViewingList, clearViewingList, clearSelectedList, contract, changeContract, updatePromptMessage } =
    useNFTBridgeStore()

  const [currentTokenId, setCurrentTokenId] = useState<number | string>("")
  const [searchLoading, setSearchLoading] = useState(false)

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
  const handleChangeFromNetwork = value => {
    switchNetwork(value)
    clearViewingList()
    clearSelectedList()
  }

  const handleChangeContract = value => {
    changeContract(value)
    clearViewingList()
    clearSelectedList()
  }

  const handleChangeTokenId = e => {
    const { value } = e.target
    if (value) {
      setCurrentTokenId(isNaN(+value) ? "" : +value)
    } else {
      setCurrentTokenId("")
    }
  }

  // TODO: tip for not owned/exists token
  const handleSearchToken = async () => {
    try {
      setSearchLoading(true)
      if (viewingList.find(item => item.id === currentTokenId)) {
        throw new Error("Duplicate TokenId!")
      }
      let uri
      let amount = 1
      if (contract?.type === TOEKN_TYPE[721]) {
        const owned = await isOwned(currentTokenId)

        if (owned) {
          uri = await tokenInstance["tokenURI(uint256)"](currentTokenId)
        } else {
          throw new Error("Not your token!")
        }
      } else {
        const exists = await isExists(currentTokenId)
        if (exists) {
          uri = await tokenInstance["uri(uint256)"](currentTokenId)
          amount = await tokenInstance["balanceOf(address,uint256)"](walletCurrentAddress, currentTokenId)
          amount = Number(amount)
        } else {
          throw new Error("Token does not exist!")
        }
      }

      if (uri && uri.startsWith("http")) {
        scrollRequest(uri).then(data => {
          addViewingList({ id: currentTokenId, amount, ...data, transferAmount: amount })
        })
      } else {
        addViewingList({ id: currentTokenId, amount, name: uri, transferAmount: amount })
      }
      setCurrentTokenId("")
    } catch (e) {
      updatePromptMessage(e.message)
    } finally {
      setSearchLoading(false)
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

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: "6px", flex: 3, padding: "5rem 4rem", display: "flex", flexDirection: "column" }}>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 400 }}>
          Select your NFTs on
        </Typography>
        <NetworkSelect
          placeholder="Select NFT'contract address"
          value={fromNetwork.chainId}
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
            "&.Mui-focused": {
              backgroundColor: theme => theme.palette.background.default,
            },
          }}
          placeholder="TOKEN ID"
          value={currentTokenId}
          onChange={handleChangeTokenId}
        />
        <LoadingButton sx={{ width: "7rem" }} loading={searchLoading} loadingText={null} disabled={!walletCurrentAddress} onClick={handleSearchToken}>
          Search
        </LoadingButton>
      </Stack>
      <Gallery sx={{ mt: "2.5rem", flex: 1 }} column={4} emptyTip="Please fill in TOEKN ID input box and click SEARCH to view your nft.">
        {viewingList.map(item => (
          <ViewingItem key={item.id} {...item}></ViewingItem>
        ))}
      </Gallery>
    </Box>
  )
}

export default Viewing
