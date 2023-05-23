import { Button, Container } from "@mui/material"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useConnectWallet from "@/hooks/useConnectWallet"

import AddressButton from "./AddressButton"

const Header = () => {
  const { walletCurrentAddress } = useWeb3Context()
  const connectWallet = useConnectWallet()

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        pt: "3rem",
      }}
    >
      {walletCurrentAddress ? (
        <>
          <AddressButton />
        </>
      ) : (
        <Button sx={{ width: "17.8rem" }} onClick={connectWallet} variant="outlined">
          Connect Wallet
        </Button>
      )}
    </Container>
  )
}

export default Header
