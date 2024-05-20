import { ethers } from "ethers"
import { useMemo, useState } from "react"
import Img from "react-cool-img"
import { useSwiper } from "swiper/react"
import useSWR from "swr"

import { Box, Skeleton } from "@mui/material"

import { fetchSignByCode, getAvatarURL, getHeartrate } from "@/apis/canvas"
import Button from "@/components/Button"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSnackbar from "@/hooks/useSnackbar"
// import { testAsyncFunc } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { isUserRejected } from "@/utils"

import InsufficientDialog from "./InsufficientDialog"
import StepWrapper from "./StepWrapper"

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

  const heartbeatURL = useMemo(() => getAvatarURL(walletCurrentAddress), [walletCurrentAddress])

  const { data, isLoading } = useSWR(getHeartrate(walletCurrentAddress), (url: string) => scrollRequest(url))

  const checkBalance = async mintFee => {
    const balance = await provider?.getBalance(walletCurrentAddress as `0x${string}`)
    if (balance) {
      if (mintFee < balance) {
        return true
      }
    }
    return false
  }

  const handleMintCanvas = async () => {
    changeIsProfileMinting(true)
    try {
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
        // return "due to any operation that can cause the transaction or top-level call to revert"
        alertWarning("Failed to mint canvas")
      }
    } catch (error) {
      if (!isUserRejected(error)) {
        alertWarning("Failed to mint canvas")
      }
      // console.log("mint canvas error", e)
    } finally {
      changeIsProfileMinting(false)
    }
  }

  const handleCloseInsufficientDialog = () => {
    setInsufficientDialogOpen(false)
  }

  return (
    <StepWrapper
      title={
        <>
          Your Pulse is{" "}
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{ display: "inline-block", width: "1.5em", backgroundColor: "rgba(256, 256, 256, 0.15)", borderRadius: "0.4rem", height: "3rem" }}
            ></Skeleton>
          ) : (
            <>{data?.heartrate}</>
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
      sx={{ mt: "2.8rem", mb: "10.2rem" }}
      action={
        <Button color="primary" width="28.2rem" loading={isProfileMinting} onClick={handleMintCanvas}>
          {isProfileMinting ? "Minting my Canvas" : "Mint my Canvas"}
        </Button>
      }
    >
      <Box sx={{ width: ["20rem", "28rem"] }}>
        <Img src={heartbeatURL} placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="avatar" width="100%"></Img>
      </Box>
      <InsufficientDialog open={insufficientDialogOpen} onClose={handleCloseInsufficientDialog} />
    </StepWrapper>
  )
}
export default MintStep
