// import { useSnackbar } from "notistack"
import { useMemo } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

import { CircularProgress, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ValidSvg } from "@/assets/svgs/canvas/check.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/canvas/circle-warning.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/canvas/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import useSnackbar from "@/hooks/useSnackbar"
import { checkBadgeEligibility, checkIfHasBadgeByAddress, mintBadge } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { generateShareTwitterURL, requireEnv, switchNetwork } from "@/utils"

import Badges, { badgeMap } from "../Dashboard/UpgradeDialog/Badges"
import BadgeDetail from "../badge/BadgeDetail"
import Back from "./Back"

const BadgeContractDetail = props => {
  const { address } = useParams()
  const { walletCurrentAddress, connect, chainId, provider } = useRainbowContext()
  const { profileMinted, changeIsBadgeMinting, isBadgeMinting } = useCanvasStore()
  // const [badgeMinted, setBadgeMinted] = useState(false)
  const navigate = useNavigate()
  const alertWarning = useSnackbar()
  const detail = useMemo(() => {
    return badgeMap[address]
  }, [address])

  const isL2 = useMemo(() => chainId === CHAIN_ID.L2, [chainId])

  const isOwned = useAsyncMemo(async () => {
    if (provider && isL2 && detail.badgeContract) {
      const hasBadge = await checkIfHasBadgeByAddress(provider, walletCurrentAddress, detail.badgeContract)
      return hasBadge
    }
  }, [provider, isL2, walletCurrentAddress, detail])

  const isEligible = useAsyncMemo(async () => {
    if (provider && isL2) {
      const badgeForMint = Badges.find(item => item?.badgeContract === address) as any
      const eligibility = await checkBadgeEligibility(provider, walletCurrentAddress, badgeForMint)
      return eligibility
    }
  }, [provider, isL2, walletCurrentAddress, address])

  const shareBadgeURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-canvas/badge-contract/${address}`
    return generateShareTwitterURL(viewURL, `I found a badge called ${detail?.name} you may like`)
  }, [address, detail])

  const metadata = useMemo(
    () => ({
      title: `Canvas Badge - ${detail?.name}`,
      description: `I found a badge called ${detail?.name} you may like`,
      image: `${requireEnv("REACT_APP_CANVAS_BACKEND_URI")}/badge-contract/${address}.png`,
    }),
    [detail],
  )

  const handleMint = async () => {
    try {
      changeIsBadgeMinting(address, true)

      const badgeForMint: any = Badges.find(item => item.badgeContract === address)
      let result = await mintBadge(provider, walletCurrentAddress, badgeForMint)
      if (result) {
        navigate(`/scroll-canvas/badge/${result}`, { replace: true })
      }
    } catch (e) {
      alertWarning(e.message)
    } finally {
      changeIsBadgeMinting(address, false)
    }
  }

  const renderTip = () => {
    if (!isL2) {
      return (
        <>
          <SvgIcon sx={{ color: "primary.main", fontSize: "2.4rem" }} component={WarningSvg} inheritViewBox></SvgIcon>
          <Typography sx={{ color: "#FF684B !important", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 500 }}>
            Please switch to Scroll.
          </Typography>
        </>
      )
    } else if (isBadgeMinting.get(address)) {
      return (
        <>
          <CircularProgress sx={{ color: "#A5A5A5" }} size={18}></CircularProgress>
          <Typography sx={{ color: "#A5A5A5 !important", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 500 }}>
            Minting...
          </Typography>
        </>
      )
    } else if (profileMinted === false) {
      return (
        <>
          <SvgIcon sx={{ color: "#FAD880", fontSize: "2.4rem" }} component={WarningSvg} inheritViewBox></SvgIcon>
          <Typography sx={{ color: "#FAD880 !important", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 500 }}>
            You need a Scroll Canvas in order to mint your Zebra Badge.
          </Typography>
        </>
      )
    } else if (isEligible === undefined) {
      return (
        <>
          <CircularProgress sx={{ color: "#A5A5A5" }} size={18}></CircularProgress>
          <Typography sx={{ color: "#A5A5A5 !important", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 500 }}>
            Checking...
          </Typography>
        </>
      )
    } else if (profileMinted && !isOwned && isEligible) {
      return (
        <>
          <SvgIcon sx={{ color: "#85E0D1", fontSize: "2.4rem" }} component={ValidSvg} inheritViewBox></SvgIcon>
          <Typography sx={{ color: "#85E0D1 !important", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 500 }}>
            You are eligible to mint the badge
          </Typography>
        </>
      )
    } else if (profileMinted && !isOwned && !isEligible) {
      return (
        <>
          <SvgIcon sx={{ color: "primary.main", fontSize: "2.4rem" }} component={WarningSvg} inheritViewBox></SvgIcon>
          <Typography sx={{ color: "#FF684B !important", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 500 }}>
            Selected account is not eligible to mint the badge yet.
          </Typography>
        </>
      )
    }
    return null
  }

  const renderAction = () => {
    if (!walletCurrentAddress) {
      return (
        <ScrollButton
          sx={theme => ({
            [theme.breakpoints.down("sm")]: {
              gridColumn: "span 3",
            },
          })}
          color="primary"
          onClick={connect}
        >
          Connect wallet
        </ScrollButton>
      )
    } else if (!isL2) {
      return (
        <ScrollButton
          sx={theme => ({
            [theme.breakpoints.down("sm")]: {
              gridColumn: "span 3",
            },
          })}
          color="primary"
          onClick={() => switchNetwork(CHAIN_ID.L2)}
        >
          Switch to Scroll
        </ScrollButton>
      )
    } else if (!profileMinted) {
      return (
        <ScrollButton
          sx={theme => ({
            [theme.breakpoints.down("sm")]: {
              gridColumn: "span 3",
            },
          })}
          color="primary"
          href="/scroll-canvas/mint"
        >
          Mint Scroll Canvas
        </ScrollButton>
      )
    } else if (isOwned) {
      return (
        <ScrollButton
          sx={theme => ({
            [theme.breakpoints.down("sm")]: {
              gridColumn: "span 3",
            },
          })}
          color="primary"
          href="/scroll-canvas"
        >
          Visit Scroll Canvas
        </ScrollButton>
      )
    } else if (profileMinted === true && !isOwned) {
      return (
        <ScrollButton
          sx={theme => ({
            [theme.breakpoints.down("sm")]: {
              gridColumn: "span 3",
            },
          })}
          color="primary"
          onClick={handleMint}
          loading={isBadgeMinting.get(address)}
          gloomy={!isEligible}
        >
          {isBadgeMinting.get(address) ? "Minting" : "Mint now"}
        </ScrollButton>
      )
    }
    return null
  }

  if (!detail) {
    return <Navigate to="/404"></Navigate>
  }
  return (
    <BadgeDetail detail={detail} metadata={metadata} property={["issuer"]} breadcrumb={<Back></Back>}>
      {renderAction()}

      {detail.native ? (
        <ScrollButton
          color="secondary"
          sx={theme => ({
            [theme.breakpoints.down("sm")]: {
              gridColumn: "span 2",
            },
          })}
          href="/scroll-canvas"
        >
          Visit my canvas
        </ScrollButton>
      ) : (
        <ScrollButton
          color="secondary"
          sx={theme => ({
            [theme.breakpoints.down("sm")]: {
              gridColumn: "span 2",
            },
          })}
          href={detail.issuer?.origin}
          target="_blank"
        >
          Visit {detail.issuer?.name}
        </ScrollButton>
      )}

      <Link external href={shareBadgeURL}>
        <SvgIcon sx={{ fontSize: "3.2rem", color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
      </Link>
      <Stack sx={{ gridColumn: "span 3", gridRow: "2 / 3" }} direction="row" gap="0.8rem" alignItems="center">
        {renderTip()}
      </Stack>
    </BadgeDetail>
  )
}

export default BadgeContractDetail
