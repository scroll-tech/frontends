import { useEffect, useState } from "react"
import ReactGA from "react-ga4"

import { Collapse, Stack, Typography } from "@mui/material"

import Alert from "@/components/Alert/NFTAlert"
import Button from "@/components/Button"
import Link from "@/components/Link"
import { MintableDate } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import { formatDate, requireEnv } from "@/utils"

const L2_SCAN_URI = requireEnv("REACT_APP_L2_SCAN_URI")
const UNIFRA_API_KEY = requireEnv("REACT_APP_UNIFRA_API_KEY")

const CheckElegbility = () => {
  const { connect, chainId, walletCurrentAddress } = useRainbowContext()

  const { isMobile } = useCheckViewport()

  const [isEligible, setIsEligible] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (walletCurrentAddress) {
      setIsEligible(0)
    }
  }, [walletCurrentAddress])

  const handleCheck = async () => {
    setLoading(true)
    scrollRequest(`${L2_SCAN_URI}/api/beta/contracts?creator=${walletCurrentAddress}`, {
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
        ReactGA.event("check_eligibility", {
          contractsNumber: items.length,
        })
      })
      .catch(e => {
        setIsEligible(-2)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderCheck = () => {
    if (isEligible === -1) {
      return <Alert severity="error">Selected account is not eligible yet to mint. Deploy a project to be qualified.</Alert>
    } else if (isEligible === -2) {
      return <Alert severity="error">Network error. Please try again later</Alert>
    } else if (isEligible === 1) {
      return <Alert severity="success">You are eligible to mint the NFT. Come back on {formatDate(MintableDate)} to claim it.</Alert>
    }
    return null
  }

  return (
    <Stack sx={{ mt: ["3.2rem", "4.8rem"] }} direction="column" alignItems="center" spacing="1.6rem">
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
      <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], mt: "0.8rem !important" }}>
        Service provided by{" "}
        <Link
          underline="always"
          external
          href={requireEnv("REACT_APP_L2_SCAN_URI")}
          sx={{ fontWeight: 700, fontSize: "inherit", textUnderlineOffset: "1px", textDecorationThickness: "1px" }}
        >
          L2SCAN team
        </Link>
        <strong>.</strong>
      </Typography>
    </Stack>
  )
}

export default CheckElegbility
