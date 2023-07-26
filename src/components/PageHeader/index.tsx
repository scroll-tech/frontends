import { useRef, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Button, Container, Stack, Typography } from "@mui/material"

import { ReactComponent as ExitIcon } from "@/assets/svgs/exit.svg"
import ButtonPopover from "@/components/ButtonPopover"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { truncateAddress } from "@/utils"

import CopyButton from "./CopyButton"
import IconButton from "./IconButton"

const useStyles = makeStyles()(theme => ({
  disconnectButton: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    fontSize: "1.2rem",
    marginBottom: 0,
    borderRadius: "1.5rem",
    boxShadow: "none",
  },
  address: {
    cursor: "default",
    marginRight: "7.2rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2.4rem",
    },
  },

  titleSection: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginTop: "8rem",
    transition: "all 0.15s ease-out",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "4rem",
    },
  },
}))

const PageHeader = props => {
  const { action, title, subTitle, children } = props
  const { classes } = useStyles()
  const { walletCurrentAddress, connect, disconnect } = useRainbowContext()

  const buttonRef = useRef(null)

  const [connectedWalletVisible, setConnectedWalletVisible] = useState(false)

  const handleOpen = () => {
    setConnectedWalletVisible(true)
  }

  const handleClose = () => {
    setConnectedWalletVisible(false)
  }

  const handleDisconnect = () => {
    handleClose()
    disconnect()
  }
  return (
    <Box sx={{ background: theme => theme.palette.scaleBackground.gradient, pt: "3rem", pb: "6rem" }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {walletCurrentAddress ? (
          <Stack direction="row">
            <Button sx={{ width: "17.8rem" }} ref={buttonRef} variant="outlined" onClick={handleOpen}>
              {truncateAddress(walletCurrentAddress)}
            </Button>
            <ButtonPopover open={connectedWalletVisible} anchorEl={buttonRef.current} title="Connected Wallet" onClose={handleClose}>
              <Stack direction="row" flexWrap="wrap" sx={{ pt: ["2.4rem", "3rem"] }}>
                <Link className={classes.address} component="span" underline="none">
                  {truncateAddress(walletCurrentAddress)}
                </Link>
                <Stack direction="row" spacing="2.4rem">
                  <CopyButton value={walletCurrentAddress} />
                  <IconButton icon={ExitIcon} viewBox="0 0 17 17" label="Disconnect" onClick={handleDisconnect} />
                </Stack>
              </Stack>
            </ButtonPopover>
            {action}
          </Stack>
        ) : (
          <Button sx={{ width: "17.8rem" }} onClick={connect} variant="outlined">
            Connect Wallet
          </Button>
        )}
      </Container>
      <Box className={classes.titleSection}>
        <Stack direction="column" alignItems="center">
          <Typography variant="h1" sx={{ mb: "1.4rem" }}>
            {title}
          </Typography>
          {subTitle && (
            <Typography variant="subtitle1" sx={{ maxWidth: "66rem" }} color="textSecondary">
              {subTitle}
            </Typography>
          )}
          {children}
        </Stack>
      </Box>
    </Box>
  )
}

export default PageHeader
