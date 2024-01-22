import { ReactNode, useState } from "react"

import { Alert, Typography as MuiTypography, Snackbar, Stack } from "@mui/material"
import { TypographyProps as MuiTypographyProps } from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

import Link from "@/components/Link"
import TextButton from "@/components/TextButton"
import { NETWORKS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { isProduction, switchNetwork } from "@/utils"

import Descriptions, { DescriptionItem } from "./Descriptions"

interface TypographyProps extends MuiTypographyProps {
  bold?: boolean
  primary?: boolean
}

const AddNetworkButton = props => {
  const { chainId, onReadd } = props

  const { walletName, chainId: currentChainId } = useRainbowContext()

  const addToWallet = async () => {
    if (currentChainId === chainId) {
      onReadd()
      return
    }
    await switchNetwork(chainId)
  }

  return <TextButton onClick={addToWallet}>Add to {walletName}</TextButton>
}

const Typography = styled(MuiTypography, {
  shouldForwardProp: prop => prop !== "bold" && prop !== "primary",
})<TypographyProps>(({ theme, bold, primary }) => ({
  fontWeight: bold ? 600 : 400,
  color: primary ? theme.palette.primary.main : theme.palette.text.primary,
}))

const WalletConfig = () => {
  const { walletName, chainId, connect } = useRainbowContext()
  const [tip, setTip] = useState<ReactNode | null>(null)

  const handleReadd = () => {
    chainId &&
      setTip(
        <>
          You are already on <b>{NETWORKS.find(item => item.chainId === chainId)!.name}</b>.
        </>,
      )
  }

  const handleClose = () => {
    setTip(null)
  }

  return (
    <>
      <Descriptions title={`Configure for ${isProduction ? "Scroll mainnet" : "our Sepolia testnet"}`}>
        {NETWORKS.map((item, index) => (
          <DescriptionItem key={item.name}>
            <Typography bold>Layer{index + 1}</Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: ["100%", "60rem"], border: "1px solid #DADADA", borderRadius: "10rem", p: ["1.2rem 1.6rem", "1.2rem 2.2rem"] }}
            >
              <Typography>{item.name}</Typography>
              {walletName ? (
                <AddNetworkButton chainId={item.chainId} onReadd={handleReadd} />
              ) : (
                <TextButton onClick={connect}>Connect Wallet</TextButton>
              )}
            </Stack>
          </DescriptionItem>
        ))}
        <DescriptionItem>
          <Typography>
            Having issues? Try completely removing previous Scroll networks from your {walletName || "wallet"}. Troubleshoot other{" "}
            <Link href="https://docs.scroll.io/en/user-guide/common-errors/" underline="hover" external>
              Common Errors
            </Link>{" "}
            here.
          </Typography>
        </DescriptionItem>
      </Descriptions>
      <Snackbar open={!!tip} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="info" onClose={handleClose}>
          {tip}
        </Alert>
      </Snackbar>
    </>
  )
}

export default WalletConfig
