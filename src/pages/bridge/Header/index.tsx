import { useEffect, useRef } from "react"

import { Button, CircularProgress } from "@mui/material"

import { ReactComponent as HistoryIcon } from "@/assets/svgs/history.svg"
import ButtonPopover from "@/components/ButtonPopover"
import PageHeader from "@/components/PageHeader"
import { networks } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore from "@/stores/txStore"

import TransactionsList from "./TransactionHistory"

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
      subTitle={`Send tokens between ${networks[0].name} and ${networks[1].name}.`}
      action={
        <>
          <Button sx={{ p: 0, width: "5rem", minWidth: "5rem", ml: "1rem" }} ref={buttonRef} onClick={handleOpen}>
            <HistoryIcon></HistoryIcon>
          </Button>
          <ButtonPopover
            open={historyVisible}
            anchorEl={buttonRef.current}
            title={<>Recent Bridge Transactions {loading && <CircularProgress size={22} />}</>}
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
