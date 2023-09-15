import dayjs from "dayjs"
import { useState } from "react"

import { Collapse, Stack } from "@mui/material"

import Button from "@/components/Button"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"

import Alert from "../../components/Alert"

const CheckElegbility = () => {
  const { connect, chainId } = useRainbowContext()

  const { isMobile } = useCheckViewport()

  const [isEligible, setIsEligible] = useState(0)

  const handleCheck = () => {
    setIsEligible(1)
    // setIsEligible(-1)
  }

  const handleClose = () => {
    setIsEligible(0)
  }

  const renderCheck = () => {
    if (isEligible === -1) {
      return (
        <Alert severity="error" onClose={handleClose}>
          Selected Wallet is not eligible yet to mint. Deploy a project to be qualified.
        </Alert>
      )
    } else if (isEligible === 1) {
      return (
        <Alert severity="success" onClose={handleClose}>
          You are eligible to mint the NFT. Come back on {dayjs(DEVELOPER_NFT_PHRASES.Ends).format("MMM D, YYYY")} to claim it.
        </Alert>
      )
    }
    return null
  }

  return (
    <Stack sx={{ mt: "4.8rem" }} direction="column" alignItems="center" spacing="1.6rem">
      {chainId ? (
        <Button color="primary" width={isMobile ? "21rem" : "25rem"} onClick={handleCheck}>
          Check eligibility
        </Button>
      ) : (
        <Button color="primary" width={isMobile ? "30.4rem" : "36.8rem"} onClick={connect}>
          Connect wallet to check eligibility
        </Button>
      )}
      <Collapse in={!!isEligible}>{renderCheck()}</Collapse>
    </Stack>
  )
}

export default CheckElegbility
