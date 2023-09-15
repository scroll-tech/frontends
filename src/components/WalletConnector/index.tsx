import { ButtonBase } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"

import Dropdown from "../../pages/new-bridge/ConnectorAndHistory/Dropdown"

const WalletConnector = props => {
  const { sx } = props
  const { walletCurrentAddress, connect } = useRainbowContext()

  if (!walletCurrentAddress) {
    return (
      <ButtonBase
        sx={{
          fontSize: "1.6rem",
          p: "0.5rem 1.6rem",
          borderRadius: "1rem",
          border: theme => `1px solid ${theme.palette.primary.contrastText}`,
          ...sx,
        }}
        onClick={connect}
      >
        Connect Wallet
      </ButtonBase>
    )
  }
  return <Dropdown {...props}></Dropdown>
}

export default WalletConnector
