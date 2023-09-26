import dayjs from "dayjs"
import { useState } from "react"

import { Collapse, Stack } from "@mui/material"

import Button from "@/components/Button"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import { requireEnv } from "@/utils"

import Alert from "../../components/Alert"

const L2_SCAN_URI = requireEnv("REACT_APP_L2_SCAN_URI")
const UNIFRA_API_KEY = requireEnv("REACT_APP_UNIFRA_API_KEY")

const CheckElegbility = () => {
  const { connect, chainId, walletCurrentAddress } = useRainbowContext()

  const { isMobile } = useCheckViewport()

  const [isEligible, setIsEligible] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleCheck = async () => {
    setLoading(true)
    scrollRequest(`${L2_SCAN_URI}api/beta/contracts?creator=${walletCurrentAddress}`, {
      headers: {
        Authorization: `Bearer ${UNIFRA_API_KEY}`,
      },
    })
      .then(({ items }) => {
        if (items.length) {
          setIsEligible(1)
        } else {
          setIsEligible(-1)
        }
      })
      .catch(e => {
        setIsEligible(-1)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderCheck = () => {
    if (isEligible === -1) {
      return <Alert severity="error">Selected account is not eligible yet to mint. Deploy a project to be qualified.</Alert>
    } else if (isEligible === 1) {
      return (
        <Alert severity="success">
          You are eligible to mint the NFT. Come back on {dayjs(DEVELOPER_NFT_PHRASES.Ends).format("MMM D, YYYY")} to claim it.
        </Alert>
      )
    }
    return null
  }

  return (
    <Stack sx={{ mt: "4.8rem" }} direction="column" alignItems="center" spacing="1.6rem">
      {isEligible ? (
        <Collapse in={!!isEligible}>{renderCheck()}</Collapse>
      ) : (
        <>
          {chainId ? (
            <Button color="primary" width={isMobile ? "21rem" : "25rem"} loading={loading} onClick={handleCheck}>
              {loading ? "Checking" : "Check"} eligibility
            </Button>
          ) : (
            <Button color="primary" width={isMobile ? "30.4rem" : "36.8rem"} onClick={connect}>
              Connect wallet to check eligibility
            </Button>
          )}
        </>
      )}
    </Stack>
  )
}

export default CheckElegbility
