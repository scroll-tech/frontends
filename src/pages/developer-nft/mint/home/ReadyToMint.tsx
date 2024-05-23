import { useState } from "react"
import Countdown, { zeroPad } from "react-countdown"
import ReactGA from "react-ga4"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchParamsByAddressURL } from "@/apis/nft"
import Alert from "@/components/Alert/NFTAlert"
import Button from "@/components/Button"
import Link from "@/components/Link"
import RequestWarning from "@/components/RequestWarning"
import { ANNOUNCING_SCROLL_ORIGINS_NFT, ContractReleaseDate, DESIGNING_SCROLL_ORIGINS } from "@/constants"
import { CHAIN_ID, L2_NAME, MintableEndDate, SCROLL_ORIGINS_NFT } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useNFTStore from "@/stores/nftStore"
import { formatDate, switchNetwork } from "@/utils"

import NFTCard from "../../components/NFTCard"
import Statistic from "../../components/Statistic"
import MintFlowDialog from "./MintFlowDialog"

const CustomLink = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontSize: "inherit",
  textUnderlineOffset: "2px",
  textDecorationThickness: "1px",
  fontWeight: 700,
}))

const MintHome = props => {
  const { total } = props
  const { chainId, connect, walletCurrentAddress } = useRainbowContext()

  const { isMobile, isPortrait, isLandscape } = useCheckViewport()
  const { isEligible, isMinting, changeIsEligible } = useNFTStore()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleCheckEligibility = async () => {
    setLoading(true)
    scrollRequest(fetchParamsByAddressURL(walletCurrentAddress))
      .then(data => {
        if (data.proof) {
          changeIsEligible(1)
          ReactGA.event("mint_now", {
            walletAddress: walletCurrentAddress,
            isEligible: 1,
          })
        } else if (!data.error) {
          changeIsEligible(-1)
          ReactGA.event("mint_now", {
            walletAddress: walletCurrentAddress,
            isEligible: -1,
          })
        } else {
          throw new Error("Netword error, try again later")
        }
      })
      .catch(e => {
        setErrorMessage(e.message.slice(0, 120))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderAction = (end = false) => {
    if (chainId === CHAIN_ID.L2) {
      if (end) {
        return (
          <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} gloomy>
            Mint ended
          </Button>
        )
      }
      return (
        <Button color="primary" loading={loading || isMinting} width={isMobile ? "23rem" : "28.2rem"} onClick={handleCheckEligibility}>
          {isMinting ? "Minting" : loading ? "Checking" : "Mint now"}
        </Button>
      )
    } else if (walletCurrentAddress) {
      return (
        <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={() => switchNetwork(CHAIN_ID.L2)}>
          Switch to {L2_NAME}
        </Button>
      )
    }
    return (
      <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={connect}>
        Connect wallet to mint
      </Button>
    )
  }

  const handleCloseFlow = () => {
    changeIsEligible(0)
  }

  const handleCloseWarning = () => {
    setErrorMessage("")
  }

  const renderCountDown = ({ hours, days, minutes, seconds, completed }) => {
    return (
      <>
        <Typography sx={{ fontSize: "2.4rem", lineHeight: "3.5rem", fontWeight: 500 }}>
          {completed ? "" : ` Mint ends in ${zeroPad(days)}:${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}
        </Typography>
        <Box
          sx={{
            height: "8rem",
            marginTop: "0.8rem !important",
          }}
        >
          {!isEligible && <>{renderAction(completed)}</>}
          {isEligible === -1 && (
            <Alert severity="error" sx={{ width: ["100%", "42.8rem"] }}>
              The wallet address is not eligible. Please reach out to Scroll Discord, ‘scroll-origins-support,’ if you have any questions about{" "}
              {SCROLL_ORIGINS_NFT}.
            </Alert>
          )}
        </Box>
      </>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8rem",
        "& .MuiTypography-root": {
          color: theme => theme.palette.primary.contrastText,
        },
        "@media (max-width: 1280px)": {
          gap: "2rem",
          display: "grid",
          gridTemplateColumns: "minmax(min-content, 1fr) 1fr",
          justifyItems: "center",
        },

        "@media (max-width: 900px)": {
          gridTemplateColumns: "1fr",
        },
        "@media (max-width: 600px)": {
          gap: "2.4rem",
        },
      }}
    >
      <NFTCard sx={{ width: ["80%", "42.5rem", "36rem", "42.5rem"] }}></NFTCard>
      <Stack direction="column" spacing={isPortrait ? "2.4rem" : "4.8rem"} alignItems={isLandscape ? "flex-start" : "center"}>
        <Box sx={{ textAlign: ["center", "center", "left"] }}>
          <Typography sx={{ fontSize: ["4rem", "7.2rem"], fontWeight: 600, lineHeight: ["5.6rem", "9.6rem"] }}>{SCROLL_ORIGINS_NFT}</Typography>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], maxWidth: ["100%", "56rem"] }}>
            <CustomLink href={ANNOUNCING_SCROLL_ORIGINS_NFT} underline="always" external>
              Scroll Origins
            </CustomLink>{" "}
            is a{" "}
            <CustomLink href={DESIGNING_SCROLL_ORIGINS} underline="always" external>
              specially designed NFT
            </CustomLink>{" "}
            program to celebrate alongside early developers building on Scroll within 60 days of Genesis Block (Before December 9, 2023 10:59PM GMT).
          </Typography>
        </Box>
        <Stack direction="row" spacing={isMobile ? "2.4rem" : "4.8rem"}>
          <Statistic label="Total NFTs minted">{typeof total === "bigint" ? total.toString() : "-"}</Statistic>
          <Statistic label="NFTs released on">{formatDate(ContractReleaseDate)}</Statistic>
        </Stack>
        <Countdown date={MintableEndDate} renderer={renderCountDown}></Countdown>
      </Stack>
      <MintFlowDialog open={isEligible === 1} minting={isMinting} onClose={handleCloseFlow}></MintFlowDialog>
      <RequestWarning open={!!errorMessage} onClose={handleCloseWarning}>
        {errorMessage}
      </RequestWarning>
    </Box>
  )
}

export default MintHome
