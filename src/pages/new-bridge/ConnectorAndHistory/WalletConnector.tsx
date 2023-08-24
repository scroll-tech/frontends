import { Button } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"

import Dropdown from "./Dropdown"

const WalletConnector = props => {
  const { sx } = props
  const { walletCurrentAddress, connect } = useRainbowContext()

  if (!walletCurrentAddress) {
    return (
      <Button variant="contained" sx={{ fontSize: ["1.6rem", "2rem"], ...sx }} onClick={connect}>
        Connect Wallet
      </Button>
    )
  }
  return <Dropdown {...props}></Dropdown>
}

export default WalletConnector
