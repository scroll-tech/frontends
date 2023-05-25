import { useRef, useState } from "react"

import { Button, CircularProgress } from "@mui/material"

import { ReactComponent as HistoryIcon } from "@/assets/svgs/history.svg"
import ButtonPopover from "@/components/ButtonPopover"
import PageHeader from "@/components/PageHeader"
import { networks } from "@/constants"
import useTxStore from "@/stores/txStore"

import TransactionsList from "./TransactionHistory"

const Header = () => {
  const { loading } = useTxStore()

  const [historyVisible, setHistoryVisible] = useState(false)
  const buttonRef = useRef(null)

  const handleOpen = () => {
    setHistoryVisible(true)
  }

  const handleClose = () => {
    setHistoryVisible(false)
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
