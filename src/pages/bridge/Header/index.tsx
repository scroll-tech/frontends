import { useEffect, useRef } from "react"

import { Button, CircularProgress, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as HistoryIcon } from "@/assets/svgs/history.svg"
import ButtonPopover from "@/components/ButtonPopover"
import Link from "@/components/Link"
import PageHeader from "@/components/PageHeader"
import { NETWORKS } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore from "@/stores/txStore"

import TransactionsList from "./TransactionHistory"

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#595959",
  textDecoration: "underline",
  "&:hover": {
    opacity: 0.85,
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2.4rem",
  fontWeight: 600,
}))

const Header = () => {
  const {
    txHistory: { refreshPageTransactions },
  } = useApp()
  const { loading } = useTxStore()

  const { historyVisible, changeHistoryVisible } = useBridgeStore()
  const buttonRef = useRef(null)

  useEffect(() => {
    if (historyVisible) {
      refreshPageTransactions(1)
    }
  }, [historyVisible])

  const handleOpen = () => {
    changeHistoryVisible(true)
  }

  const handleClose = () => {
    changeHistoryVisible(false)
  }
  return (
    <PageHeader
      title="Scroll Bridge"
      subTitle={`Send tokens between ${NETWORKS[0].name} and ${NETWORKS[1].name}.`}
      action={
        <>
          <Button sx={{ p: 0, width: "5rem", minWidth: "5rem", ml: "1rem" }} ref={buttonRef} onClick={handleOpen}>
            <HistoryIcon></HistoryIcon>
          </Button>
          <ButtonPopover
            open={historyVisible}
            anchorEl={buttonRef.current}
            title={
              <>
                <Title>Recent Bridge Transactions {loading && <CircularProgress size={22} />}</Title>
                <StyledLink target="_blank" href="http://localhost:3000/bridge#end" rel="noopener noreferrer">
                  What’s happening with my transaction?{" "}
                </StyledLink>
              </>
            }
            onClose={handleClose}
          >
            <TransactionsList></TransactionsList>
          </ButtonPopover>
        </>
      }
    ></PageHeader>
  )
}

export default Header
