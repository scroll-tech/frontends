import { useEffect, useState } from "react"

import { Container } from "@mui/material"

import { ChainId, networks } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { switchNetwork } from "@/utils"

import NFTSelect from "./NFTSelect"
import Transfer from "./Transfer"

const NFTPanel = () => {
  const { chainId } = useWeb3Context()

  const [fromNetwork, setFromNetwork] = useState<any>({ chainId: 0 })
  const [toNetwork, setToNetwork] = useState<any>({ chainId: 0 })

  useEffect(() => {
    if (chainId && Object.values(ChainId).includes(chainId)) {
      const fromNetworkIndex = networks.findIndex(item => item.chainId === chainId)
      setFromNetwork(networks[fromNetworkIndex])
      setToNetwork(networks[+!fromNetworkIndex])
    } else if (chainId) {
      setFromNetwork(networks[0])
      setToNetwork(networks[1])
      switchNetwork(networks[0].chainId)
    } else {
      setFromNetwork(networks[0])
      setToNetwork(networks[1])
    }
  }, [chainId])
  return (
    <Container sx={{ display: "flex", gap: "1rem", my: "3rem", height: "85.5rem" }}>
      <NFTSelect network={fromNetwork}></NFTSelect>
      <Transfer network={toNetwork}></Transfer>
    </Container>
  )
}

export default NFTPanel
