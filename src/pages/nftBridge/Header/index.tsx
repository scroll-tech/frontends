import { makeStyles } from "tss-react/mui"

import CloseIcon from "@mui/icons-material/Close"
import { Box, Card, Container, Divider, Typography } from "@mui/material"
import { Stack } from "@mui/system"

import { ReactComponent as ExitIcon } from "@/assets/svgs/exit.svg"
import Link from "@/components/Link"
import TextIconButton from "@/components/TextIconButton"
import WalletIndicator from "@/components/WalletIndicator"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import TransactionHistory from "@/pages/bridge/Header/TransactionHistory"
import useBridgeStore from "@/stores/bridgeStore"
import { truncateAddress } from "@/utils"

import CopyButton from "./CopyButton"
import PageTitle from "./PageTitle"

const useStyles = makeStyles()(theme => ({
  container: {
    width: "max-content",
    padding: "2.8rem",
    borderRadius: "1rem",
    boxSizing: "border-box",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100vw - 3.2rem)",
      margin: "0 1.6rem",
      padding: "2rem",
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
      fontWeight: 600,
    },
  },

  transactionsList: {
    margin: " 3rem 0",
    [theme.breakpoints.down("sm")]: {
      margin: "2.4rem 0",
    },
  },
  changeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    borderRadius: "1.5rem",
    boxShadow: "none",
  },
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
  copyButton: {
    marginRight: "2.4rem",
  },
}))

const Header = () => {
  const { classes } = useStyles()
  const { walletCurrentAddress, disconnectWallet } = useWeb3Context()

  const {
    txHistory: { refreshPageTransactions },
  } = useApp()
  const { historyVisible, changeHistoryVisible } = useBridgeStore()

  const handleOpen = () => {
    changeHistoryVisible(true)
    refreshPageTransactions(1)
  }

  const handleClose = () => {
    changeHistoryVisible(false)
  }

  const handleDisconnect = () => {
    handleClose()
    disconnectWallet()
  }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.default",
        mt: "3rem",
      }}
    >
      <PageTitle></PageTitle>
      <WalletIndicator popup open={historyVisible} onOpen={handleOpen} onClose={handleClose}>
        <Card className={classes.container}>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" className={classes.title}>
              Connected Wallet
            </Typography>
            <CloseIcon onClick={handleClose} />
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", p: ["2.4rem 0", "3rem 0"] }}>
            <Link className={classes.address} component="span" underline="none">
              {truncateAddress(walletCurrentAddress as string)}
            </Link>
            <Stack direction="row">
              <CopyButton value={walletCurrentAddress} className={classes.copyButton} />
              <TextIconButton icon={ExitIcon} viewBox="0 0 17 17" label="Disconnect" onClick={handleDisconnect} />
            </Stack>
          </Stack>
          <Divider />
          <Box sx={{ position: "relative", margin: ["2.4rem 0", "3rem 0"] }}>
            <TransactionHistory />
          </Box>
        </Card>
      </WalletIndicator>
    </Container>
  )
}

export default Header
