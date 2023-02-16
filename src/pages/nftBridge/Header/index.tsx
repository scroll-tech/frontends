import { Button, Container } from "@mui/material"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"

import AddressButton from "./AddressButton"

const Header = () => {
  const { walletCurrentAddress, connectWallet } = useWeb3Context()

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        bgcolor: "background.default",
        mt: "3rem",
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
