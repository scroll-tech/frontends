import { Container } from "@mui/material"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"

import Button from "../components/Button"
import AddressButton from "./AddressButton"

const Header = () => {
  const { walletCurrentAddress, connectWallet } = useWeb3Context()

  return (
    <Container className="flex items-center justify-end bg-white mt-12">
      {walletCurrentAddress ? (
        <>
          <AddressButton />
        </>
      ) : (
        <Button onClick={connectWallet} variant="outlined" large>
          Connect Wallet
        </Button>
      )}
    </Container>
  )
}

export default Header
