import { ethers } from "ethers"
import { useEffect, useMemo, useState } from "react"
import Img from "react-cool-img"
import { useSwiper } from "swiper/react"
import useSWR from "swr"

import { Box, Skeleton, Stack, Typography } from "@mui/material"

import { fetchSignByCode, getAvatarURL, getHeartrate } from "@/apis/canvas"
import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSnackbar from "@/hooks/useSnackbar"
// import { testAsyncFunc } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { isUserRejected, recognizeError, requireEnv, sentryDebug, trimErrorMessage } from "@/utils"

import InsufficientDialog from "./InsufficientDialog"
import StepWrapper from "./StepWrapper"
import TermsAndConditionsDialog from "./TermsAndConditionsDialog"

const PROFILE_REGISTRY_ADDRESS = requireEnv("REACT_APP_PROFILE_REGISTRY_ADDRESS")

const MintStep = props => {
  const { scrollTarget } = props
  const swiper = useSwiper()
  const { isMobile } = useCheckViewport()
  const { walletCurrentAddress, provider } = useRainbowContext()
  const { profileRegistryContract } = useCanvasContext()

  const { changeIsProfileMinting, isProfileMinting, profileName, referralCode, changeReferralCode, checkIfProfileMinted, changeInitialMint } =
    useCanvasStore()
  const alertWarning = useSnackbar()

  const [insufficientDialogOpen, setInsufficientDialogOpen] = useState(false)
  const [tAndODialogVisible, setTAndODialogVisible] = useState(false)

  const heartbeatURL = useMemo(() => getAvatarURL(walletCurrentAddress), [walletCurrentAddress])

  useEffect(() => {
    if (heartbeatURL) {
      fetch(heartbeatURL)
    }
  }, [heartbeatURL])

  const { data, isLoading } = useSWR(getHeartrate(walletCurrentAddress), (url: string) => scrollRequest(url))

  const checkIsContract = async contractAddress => {
    const provider = profileRegistryContract.runner.provider
    if (!provider) throw new Error("provider is not defined")
    const code = await provider.getCode(contractAddress)
    if (code === "0x") throw new Error("You are connected to the wrong network. Please switch to the correct network and refresh.")
  }

  const checkBalance = async mintFee => {
    const balance = await provider?.getBalance(walletCurrentAddress as `0x${string}`)
    if (balance && mintFee < balance) {
      return true
    }
    return false
  }

  const handleMintCanvas = async () => {
    changeIsProfileMinting(true)

    try {
      await checkIsContract(PROFILE_REGISTRY_ADDRESS)

      let codeSignature = "0x"
      if (referralCode) {
        const { signature } = await scrollRequest(fetchSignByCode(referralCode, walletCurrentAddress))
        codeSignature = signature
      }
      console.log(codeSignature, "signature")
      const mintFee = ethers.parseEther(codeSignature === "0x" ? "0.001" : "0.0005")
      const isValidBalance = await checkBalance(mintFee)
      if (!isValidBalance) {
        setInsufficientDialogOpen(true)
        return
      }

      const tx = await profileRegistryContract.mint(profileName, codeSignature, { value: mintFee })
      const txReceipt = await tx.wait()

      // const txReceipt: any = await testAsyncFunc({ status: 1 })
      if (txReceipt.status === 1) {
        changeReferralCode("")
        changeInitialMint(true)
        await checkIfProfileMinted(profileRegistryContract, walletCurrentAddress!)
        swiper.slideNext(300)
        scrollTarget?.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      } else {
        throw new Error("due to any operation that can cause the transaction or top-level call to revert")
      }
    } catch (error) {
      if (!isUserRejected(error)) {
        const message = recognizeError(error)
        alertWarning(trimErrorMessage(message))
        sentryDebug(`mint canvas:${walletCurrentAddress}-${message}`)
      }
    } finally {
      changeIsProfileMinting(false)
    }
  }

  const handleCloseInsufficientDialog = () => {
    setInsufficientDialogOpen(false)
  }

  const handleOpenTAndODialog = () => {
    setTAndODialogVisible(true)
  }

  const handleCloseTAndODialog = () => {
    setTAndODialogVisible(false)
  }

  return (
    <StepWrapper
      title={
        <>
          Your Pulse is{" "}
          {isLoading ? (
            <Skeleton
              variant="text"
              sx={{
                display: "inline-block",
                width: "2em",
                backgroundColor: "rgba(256, 256, 256, 0.15)",
                borderRadius: "0.4rem",
                fontSize: ["2rem", "3.2rem"],
              }}
            ></Skeleton>
          ) : (
            <>{data?.heartrate ?? "--"}</>
          )}
        </>
      }
      description={
        <>
          Everyone who uses Scroll has a unique heartbeat.
          {!isMobile && <br></br>}
          It beats faster when you are more active onchain.
        </>
      }
      sx={{ mt: "2.8rem", mb: [0, "10.2rem"] }}
      action={
        <Stack direction="column" alignItems="center" sx={{ gap: ["0.8rem", "1.6rem"] }}>
          <Button color="primary" width={isMobile ? "100%" : "28.2rem"} loading={isProfileMinting} onClick={handleMintCanvas}>
            {isProfileMinting ? "Minting my Canvas" : "Mint my Canvas"}
          </Button>
          <Typography sx={{ fontSize: "1.6rem", lineHeight: "2.4rem", fontWeight: 600, color: "#A0A0A0 !important" }}>
            By continuing to mint Scroll Canvas,
            <br /> you agree to the{" "}
            <TextButton underline="always" sx={{ color: "inherit !important" }} onClick={handleOpenTAndODialog}>
              Terms & Conditions
            </TextButton>
          </Typography>
        </Stack>
      }
    >
      <Box sx={{ width: ["20rem", "28rem"] }}>
        <Img src={heartbeatURL} placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="avatar" width="100%"></Img>
      </Box>
      <InsufficientDialog open={insufficientDialogOpen} onClose={handleCloseInsufficientDialog} />
      <TermsAndConditionsDialog open={tAndODialogVisible} onClose={handleCloseTAndODialog}></TermsAndConditionsDialog>
    </StepWrapper>
  )
}
export default MintStep
