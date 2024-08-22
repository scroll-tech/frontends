import { BrowserProvider } from "ethers"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { isDesktop } from "react-device-detect"
import { Helmet } from "react-helmet-async"
import { Navigate, useNavigate, useParams } from "react-router-dom"

import Canvas from "@/components/Canvas"
import { EXPLORE_BADGES_URL } from "@/constants"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import { checkIfProfileMinted } from "@/services/canvasService"
import useCanvasStore, { BadgesDialogType } from "@/stores/canvasStore"
import { requireEnv } from "@/utils"

import GridBg from "../components/GridBg"
import LoadingPage from "../loading"
import ActionBox from "./ActionBox"
import BadgeDetailDialog from "./BadgeDetailDialog"
import BadgeWall from "./BadgeWall"
import BadgesDialog from "./BadgesDialog"
import CustomizeDisplayDialog from "./CustomizeDisplayDialog"
import FirstBadgeMask from "./FirstBadgeMask"
import NameDialog from "./NameDialog"
import ReferDialog from "./ReferDialog"

const Dashboard = props => {
  const { walletCurrentAddress } = useRainbowContext()

  const { address: othersWalletAddress } = useParams()
  const navigate = useNavigate()

  const { unsignedProfileRegistryContract, publicProvider } = useCanvasContext()

  const {
    canvasUsername,
    attachedBadges,
    fetchCurrentCanvasDetail,
    fetchOthersCanvasDetail,
    profileAddress,
    changeProfileDetailLoading,
    profileDetailLoading,
    badgeAnimationVisible,
    initialMint,
    badgesDialogVisible,
    upgradableBadges,
    pickUpgradableBadges,
    pickUpgradableBadgesLoading,
  } = useCanvasStore()

  const metadata = {
    title: `Scroll -  ${canvasUsername}'s Canvas`,
    description: "Collect onchain badges and build your story on Scroll",
    image: `${requireEnv("REACT_APP_CANVAS_BACKEND_URI")}/canvas/${othersWalletAddress || walletCurrentAddress}.png`,
  }

  useEffect(() => {
    if (badgesDialogVisible === BadgesDialogType.UPGRADE) {
      pickUpgradableBadges(publicProvider)
    }
  }, [badgesDialogVisible])

  const scrollyAlert = useMemo(() => {
    return {
      title: "Explore badges",
      content: "Welcome to Scroll Canvas where you can earn badges across the ecosystem. Explore protocols offering badges now!",
      action: () => {
        navigate(EXPLORE_BADGES_URL)
      },
    }
  }, [])

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    if (unsignedProfileRegistryContract && othersWalletAddress) {
      fetchOthers(publicProvider, unsignedProfileRegistryContract, othersWalletAddress)
    }
  }, [unsignedProfileRegistryContract, othersWalletAddress])

  // must have minted
  useEffect(() => {
    if (publicProvider && publicProvider instanceof BrowserProvider && !othersWalletAddress && profileAddress && !initialMint) {
      fetchCurrent(publicProvider, walletCurrentAddress, profileAddress)
    }
  }, [publicProvider, othersWalletAddress, profileAddress, initialMint])

  const alertWarning = useSnackbar()

  const fetchCurrent = async (provider, walletAddress, profileAddress) => {
    try {
      changeProfileDetailLoading(true)
      const signer = await provider?.getSigner(0)
      await fetchCurrentCanvasDetail(signer, walletAddress, profileAddress)
      pickUpgradableBadges(provider)
    } catch (e) {
      alertWarning(e.message)
    } finally {
      changeProfileDetailLoading(false)
    }
  }

  const fetchOthers = async (provider, unsignedProfileRegistryContract, othersWalletAddress) => {
    try {
      changeProfileDetailLoading(true)
      await checkAndFetchOthersCanvasDetail(provider, unsignedProfileRegistryContract, othersWalletAddress)
    } catch (e) {
      alertWarning(e.message)
    } finally {
      changeProfileDetailLoading(false)
    }
  }
  const checkAndFetchOthersCanvasDetail = async (provider, unsignedProfileRegistryContract, othersWalletAddress) => {
    const { minted, profileAddress } = await checkIfProfileMinted(unsignedProfileRegistryContract, othersWalletAddress)
    if (!minted) {
      navigate("/404")
      return
    }
    await fetchOthersCanvasDetail(provider, othersWalletAddress, profileAddress)
  }

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
    return <Navigate to="/canvas" replace></Navigate>
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
        <GridBg badgewidth={badgewidth} gridNum={gridNum}>
          <BadgeWall badgewidth={badgewidth} gridNum={gridNum} windowDimensions={windowDimensions} />

          {isDesktop && !othersWalletAddress && (
            <Canvas visible buttonText={scrollyAlert.title} title={scrollyAlert.content} onClick={scrollyAlert.action} canvasId="dashboardCanvas" />
          )}
          {!!othersWalletAddress ? (
            <>
              <ActionBox></ActionBox>
              <BadgeDetailDialog />
            </>
          ) : (
            <>
              <ActionBox />
              <NameDialog />
              <CustomizeDisplayDialog />
              <ReferDialog />
              <BadgesDialog badges={upgradableBadges} loading={pickUpgradableBadgesLoading} />
              <BadgeDetailDialog />
            </>
          )}
        </GridBg>
      )}
      {badgeAnimationVisible && <FirstBadgeMask badgeWidth={badgewidth}></FirstBadgeMask>}
    </>
  )
}

export default Dashboard
