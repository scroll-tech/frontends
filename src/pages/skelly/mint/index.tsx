import { ethers } from "ethers"
import { useState } from "react"

import { Box, InputBase, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { fetchSignByCode } from "@/apis/skelly"
import Button from "@/components/Button"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useValidateSkellyName from "@/hooks/useValidateSkellyName"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

import InsufficientDialog from "./InsufficientDialog"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 6.5rem)", // "100vh" - "header height"
  padding: "15rem 0",
  backgroundColor: "#101010",
  [theme.breakpoints.down("sm")]: {
    minHeight: "calc(100vh - 6.2rem)",
    padding: "0 1rem",
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  maxWidth: "51rem",
  width: "100%",

  ".MuiInputBase-input": {
    textAlign: "center",
    height: "8.8rem",
    lineHeight: "8.8rem",
    fontSize: "7.2rem",
    fontWeight: 600,
    padding: 0,
    color: theme.palette.primary.contrastText,
  },
}))

const Mint = () => {
  const { isMobile } = useCheckViewport()

  const { walletCurrentAddress, provider } = useRainbowContext()
  const { profileRegistryContract, checkIfProfileMinted } = useSkellyContext()
  const [insufficientDialogOpen, setInsufficientDialogOpen] = useState(false)

  const { changeMintStep, referralCode, changeReferralCode } = useSkellyStore()

  const [isMinting, setIsMinting] = useState(false)
  const [name, setName] = useState("")

  const { helpText, validating, handleValidateName, renderValidation } = useValidateSkellyName(name)

  const checkBalance = async () => {
    const balance = await provider?.getBalance(walletCurrentAddress as `0x${string}`)
    if (!balance) {
      setInsufficientDialogOpen(true)
      return
    }
  }

  const handleMint = async () => {
    checkBalance()
    setIsMinting(true)
    try {
      let codeSignature = "0x"
      if (referralCode) {
        const { signature } = await scrollRequest(fetchSignByCode(referralCode, walletCurrentAddress))
        codeSignature = signature
      }
      const tx = await profileRegistryContract.mint(name, codeSignature, { value: ethers.parseEther(codeSignature === "0x" ? "0.001" : "0.0005") })
      const txReceipt = await tx.wait()
      if (txReceipt.status === 1) {
        changeReferralCode("")
        console.log("txReceipt", txReceipt)
        const isMinted = await checkIfProfileMinted(walletCurrentAddress)
        changeMintStep(MintStep.REFERRAL_CODE)
        console.log("checkIfProfileMinted", isMinted)
      } else {
        return "due to any operation that can cause the transaction or top-level call to revert"
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsMinting(false)
    }
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleKeydown = async e => {
    if (e.keyCode === 13) {
      const nextHelpText = await handleValidateName()
      if (!nextHelpText) {
        handleMint()
      }
    }
  }

  return (
    <Container>
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "5.6rem", fontWeight: 600, color: "primary.contrastText", mb: "13rem" }}>
        Enter your name
      </Typography>
      <Box sx={{ position: "relative", mb: "21.6rem" }}>
        <StyledInputBase
          inputProps={{
            maxLength: 15,
            minLength: 4,
          }}
          value={name}
          onChange={handleChangeName}
          autoFocus
          onKeyDown={handleKeydown}
          onBlur={handleValidateName}
        />
        <Stack
          direction="row"
          gap="0.5rem"
          sx={{
            position: "absolute",
            top: "11.2rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {renderValidation()}
        </Stack>
      </Box>

      <Button gloomy={!!helpText || validating} color="primary" loading={isMinting} width={isMobile ? "23rem" : "28.2rem"} onClick={handleMint}>
        {isMinting ? "Minting" : "Mint now"}
      </Button>
      <InsufficientDialog open={insufficientDialogOpen} onClose={() => setInsufficientDialogOpen(false)} />
    </Container>
  )
}

export default Mint
