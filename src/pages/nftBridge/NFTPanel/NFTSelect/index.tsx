import { useEffect, useState } from "react"
import useSWR from "swr"

import { Box, Button, TextField, Typography } from "@mui/material"
import { Stack } from "@mui/system"

import { nftTokenListUrl } from "@/apis/dynamic"
import { ChainId, TOEKN_TYPE, networks } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { requireEnv, switchNetwork } from "@/utils"

import ContractSelect from "../../components/ContractSelect"
import NetworkSelect from "../../components/NetworkSelect"
import Gallery from "../Gallery"
import useTokenInstance from "../useTokenInstance"

const branchName = requireEnv("REACT_APP_SCROLL_ENVIRONMENT").toLocaleLowerCase()

const NFTSelect = () => {
  const { chainId, walletCurrentAddress } = useWeb3Context()
  const [fromNetwork, setFromNetwork] = useState<any>(networks[0])
  const [contract, setContract] = useState<any>({})
  const [currentTokenId, setCurrentTokenId] = useState<number>()

  const { addViewingList } = useNFTBridgeStore()

  const tokenInstance = useTokenInstance(contract)

  const { data: contractList } = useSWR(
    nftTokenListUrl(branchName),
    url => {
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
    },
    {
      revalidateOnFocus: false,
    },
  )

  useEffect(() => {
    if (chainId && Object.values(ChainId).includes(chainId)) {
      const fromNetworkIndex = networks.findIndex(item => item.chainId === chainId)

      setFromNetwork(networks[fromNetworkIndex])
      // setToNetwork(networks[+!fromNetworkIndex])
    } else if (chainId) {
      setFromNetwork(networks[0])
      // setToNetwork(networks[1])
      handleChangeFromNetwork(networks[0].chainId)
    } else {
      setFromNetwork(networks[0])
      // setToNetwork(networks[1])
    }
  }, [chainId])

  const handleChangeContract = value => {
    setContract(value)
  }

  // TODO: tip for not owned/exists token
  const handleSearchToken = async () => {
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
      }
    }
    // console.log(uri, "uri")

    if (uri && uri.startsWith("http")) {
      scrollRequest(uri).then(data => {
        addViewingList({ id: currentTokenId, amount, ...data })
      })
    } else if (uri) {
      addViewingList({ id: currentTokenId, amount, name: uri })
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

  // const get1155Balance = async () => {
  //   const amount = await tokenInstance["balanceOf(address,uint256)"](walletCurrentAddress, currentTokenId)
  //   console.log(amount.toNumber(), "amount")
  // }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: "6px", flex: 7 }}>
      <Stack direction="row">
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 400 }}>
          Select your NFTs on
        </Typography>
        <NetworkSelect value={fromNetwork.chainId} options={networks} onChange={handleChangeFromNetwork}></NetworkSelect>
      </Stack>
      <Stack direction="row">
        <ContractSelect value={contract} data={contractList || []} onChange={handleChangeContract}></ContractSelect>
        <TextField
          variant="filled"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={currentTokenId}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentTokenId(isNaN(+event.target.value) ? undefined : +event.target.value)
          }}
        />
        <Button onClick={handleSearchToken}>Search</Button>
      </Stack>
      <Gallery></Gallery>

      {/* <Button onClick={get1155Balance}>Get 1155 balance of {currentTokenId}</Button> */}
    </Box>
  )
}

export default NFTSelect
