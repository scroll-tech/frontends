import { Button } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"

import Dropdown from "./Dropdown"

const WalletConnector = () => {
  const { walletCurrentAddress, connect } = useRainbowContext()

  if (!walletCurrentAddress) {
    return (
      <Button variant="contained" onClick={connect}>
        Connect Wallet
      </Button>
    )
  }
  return <Dropdown></Dropdown>
}

export default WalletConnector
