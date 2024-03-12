import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { Box } from "@mui/material"
import { styled } from "@mui/system"

import { useRainbowContext } from "@/contexts/RainbowProvider"
// import { BADGES_VISIBLE_TYPE } from "@/constants"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import { checkIfProfileMinted } from "@/services/skellyService"
import useSkellyStore from "@/stores/skellyStore"
import { requireEnv } from "@/utils"

import LoadingPage from "../loading"
import ActionBox from "./ActionBox"
import BadgeDetailDialog from "./BadgeDetailDialog"
import BadgeWall from "./BadgeWall"
import BadgesDialog from "./BadgesDialog"
import NameDialog from "./NameDialog"
import ReferDialog from "./ReferDialog"
import UpgradeDialog from "./UpgradeDialog"

const Container: any = styled(Box)(({ theme, badgewidth }: any) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "calc(100vh - 6.5rem)",
  backgroundColor: "#101010",
  backgroundImage:
    "linear-gradient(90deg, rgba(255,255,255, 0.3) 1px, transparent 1px), linear-gradient( rgba(255,255,255, 0.3) 1px, transparent 1px)",
  backgroundSize: `${badgewidth}px ${badgewidth}px`,
  backgroundPosition: `calc(50% - ${badgewidth / 2}px) calc(50% - ${badgewidth / 2}px)`,
  "&::before, &::after": {
    content: "''",
    height: "100%",
    position: "absolute",
    top: 0,
    width: "calc((100vw - 100vh + 14rem)/ 2) ",
    zIndex: 42,
  },
  "&::before": {
    background: "linear-gradient(90deg, #101010 50.5%, rgba(16, 16, 16, 0) 100%)",
    left: 0,
  },
  "&::after": {
    background: "linear-gradient(270deg, #101010 50.5%, rgba(16, 16, 16, 0) 100%)",
    right: 0,
  },
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 6.2rem)",
  },
}))

const Dashboard = props => {
  const { walletCurrentAddress, provider } = useRainbowContext()

  const { address: othersWalletAddress } = useParams()
  const navigate = useNavigate()
  const { unsignedProfileRegistryContract, publicProvider } = useSkellyContext()
  const {
    skellyUsername,
    attachedBadges,
    fetchCurrentSkellyDetail,
    fetchOthersSkellyDetail,
    profileAddress,
    changeProfileDetailLoading,
    profileDetailLoading,
  } = useSkellyStore()

  useEffect(() => {
    if (publicProvider && unsignedProfileRegistryContract && othersWalletAddress) {
      fetchOthers(publicProvider, unsignedProfileRegistryContract, othersWalletAddress)
    }
  }, [publicProvider, unsignedProfileRegistryContract, othersWalletAddress])

  // must have minted
  useEffect(() => {
    if (provider && !othersWalletAddress && profileAddress) {
      fetchCurrent(provider, walletCurrentAddress, profileAddress)
    }
  }, [provider, othersWalletAddress, profileAddress])

  const fetchCurrent = async (provider, walletAddress, profileAddress) => {
    try {
      changeProfileDetailLoading(true)
      const signer = await provider?.getSigner(0)
      await fetchCurrentSkellyDetail(signer, walletAddress, profileAddress)
    } catch (e) {
      console.log("fetch others skelly error", e)
    } finally {
      changeProfileDetailLoading(false)
    }
  }

  const fetchOthers = async (provider, unsignedProfileRegistryContract, othersWalletAddress) => {
    try {
      changeProfileDetailLoading(true)
      await checkAndFetchOthersSkellyDetail(provider, unsignedProfileRegistryContract, othersWalletAddress)
    } catch (e) {
    } finally {
      changeProfileDetailLoading(false)
    }
  }
  const checkAndFetchOthersSkellyDetail = async (provider, unsignedProfileRegistryContract, othersWalletAddress) => {
    const { minted, profileAddress } = await checkIfProfileMinted(unsignedProfileRegistryContract, othersWalletAddress)
    if (!minted) {
      navigate("/404")
      return
    }
    await fetchOthersSkellyDetail(provider, othersWalletAddress, profileAddress)
  }

  const metadata = {
    title: `Scroll -  ${skellyUsername}'s Skelly`,
    description: "Hi, I've minted Scroll Skelly!",
    image: `${requireEnv("REACT_APP_SKELLY_URI")}/skelly/${othersWalletAddress || walletCurrentAddress}.png`,
  }

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleResize = useCallback(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const gridNum = useMemo(() => (attachedBadges.length > 12 ? 8 : 4), [attachedBadges])

  const badgewidth = useMemo(() => {
    const { width, height } = windowDimensions
    if (width < height - 62) {
      return (width - 62) / gridNum
    } else {
      return (height - 65 - 80) / gridNum
    }
  }, [windowDimensions, gridNum])

  if (othersWalletAddress === walletCurrentAddress) {
    return <Navigate to="/scroll-skelly" replace></Navigate>
  }
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
      </Helmet>
      {!!profileDetailLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <Container badgewidth={badgewidth}>
          <BadgeWall badgewidth={badgewidth} gridNum={gridNum} windowDimensions={windowDimensions} />
          {!!othersWalletAddress ? (
            <>
              <ActionBox></ActionBox>
              <BadgeDetailDialog />
            </>
          ) : (
            <>
              <ActionBox />
              <NameDialog />
              <BadgesDialog />
              <ReferDialog />
              <UpgradeDialog />
              <BadgeDetailDialog />
            </>
          )}
        </Container>
      )}
    </>
  )
}

export default Dashboard
