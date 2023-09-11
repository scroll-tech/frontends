import dayjs from "dayjs"
import { useState } from "react"

import { Box } from "@mui/material"

import Button from "@/components/Button"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useNFTStore from "@/stores/nftStore"

import Alert from "../../components/Alert"

const CheckElegbility = () => {
  const { phrase } = useNFTStore()

  const [isEligible, setIsEligible] = useState(0)

  if (phrase === "warm-up") {
    return null
  }

  const handleCheck = () => {
    // setIsEligible(1)
    setIsEligible(-1)
  }

  const renderCheck = () => {
    if (isEligible === -1) {
      return <Alert severity="error">Selected Wallet is not eligible yet to mint. Deploy a project to be qualified.</Alert>
    } else if (isEligible === 1) {
      return (
        <Alert severity="success">
          You are eligible to mint the NFT. Come back on {dayjs(DEVELOPER_NFT_PHRASES.End).format("MMM D, YYYY")} to claim it.
        </Alert>
      )
    }
    return (
      <Button color="primary" onClick={handleCheck}>
        Check my eligibility
      </Button>
    )
  }

  return <Box sx={{ mt: "4.8rem" }}>{renderCheck()}</Box>
}

export default CheckElegbility
