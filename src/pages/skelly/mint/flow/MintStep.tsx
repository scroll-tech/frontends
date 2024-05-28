import { ethers } from "ethers"
import { useMemo, useState } from "react"
import Img from "react-cool-img"
import { useSwiper } from "swiper/react"
import useSWR from "swr"

import { Box, Skeleton } from "@mui/material"

import { getAvatarURL } from "@/apis/skelly"
import { fetchSignByCode, getHeartrate } from "@/apis/skelly"
import Button from "@/components/Button"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore from "@/stores/skellyStore"

import InsufficientDialog from "./InsufficientDialog"
import StepWrapper from "./StepWrapper"

const MintStep = props => {
  const { scrollTarget } = props
  const swiper = useSwiper()
  const { walletCurrentAddress, provider } = useRainbowContext()
  const { profileRegistryContract } = useSkellyContext()

  const { changeIsProfileMinting, isProfileMinting, profileName, referralCode, changeReferralCode, checkIfProfileMinted } = useSkellyStore()
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
      if (txReceipt.status === 1) {
        changeReferralCode("")
        await checkIfProfileMinted(profileRegistryContract, walletCurrentAddress!)
        swiper.slideNext(300)
        scrollTarget?.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      } else {
        return "due to any operation that can cause the transaction or top-level call to revert"
      }
    } catch (e) {
      console.log("mint skelly error", e)
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
          <br></br>
          It beats faster when you are more active onchain.
        </>
      }
      sx={{ mt: "6rem", mb: "9.6rem" }}
      action={
        <Button color="primary" loading={isProfileMinting} onClick={handleMintCanvas}>
          {isProfileMinting ? "Minting my Canvas" : "Mint my Canvas"}
        </Button>
      }
    >
      <Box sx={{ width: "28rem" }}>
        <Img src={heartbeatURL} placeholder="/imgs/skelly/avatarPlaceholder.svg" alt="avatar" width="100%"></Img>
      </Box>
      <InsufficientDialog open={insufficientDialogOpen} onClose={handleCloseInsufficientDialog} />
    </StepWrapper>
  )
}
export default MintStep
