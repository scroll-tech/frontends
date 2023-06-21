import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import TextButton from "@/components/TextButton"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { switchNetwork } from "@/utils"

const Container = styled("div")(
  ({ theme }) => `
  display: grid;
  width: 100%;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-auto-rows: min-content;
`,
)

const SelectedGallery = props => {
  const { column, emptyTip, sx, children, ...restProps } = props
  const { walletCurrentAddress, connectWallet, chainId } = useWeb3Context()

  const { fromNetwork } = useNFTBridgeStore()

  const renderTip = () => {
    if (!walletCurrentAddress) {
      return (
        <TextButton color="secondary" onClick={connectWallet}>
          Click here to connect wallet
        </TextButton>
      )
    } else if (chainId !== fromNetwork.chainId) {
      return <TextButton onClick={() => switchNetwork(fromNetwork.chainId)}>Click here to switch to {fromNetwork.name}.</TextButton>
    }
    return (
      <Typography color="secondary" sx={{ fontSize: "1.2rem", px: "1.6rem" }}>
        {emptyTip}
      </Typography>
    )
  }
  return (
    <>
      {children.length ? (
        <Container sx={{ ...sx, gridTemplateColumns: `repeat(${column}, 1fr)` }} {...restProps}>
          {children}
        </Container>
      ) : (
        <Box sx={{ ...sx, display: "flex", justifyContent: "center", alignItems: "center" }} {...restProps}>
          {renderTip()}
        </Box>
      )}
    </>
  )
}

export default SelectedGallery
