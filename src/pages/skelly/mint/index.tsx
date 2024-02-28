import { ethers } from "ethers"
import { useMemo, useState } from "react"

import { Box, InputBase } from "@mui/material"
import { styled } from "@mui/system"

import Button from "@/components/Button"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

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
  color: "#FFFFFF",
  fontSize: "7.2rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "8.8rem",
  maxWidth: "51rem",
  width: "100%",
  marginBottom: "17rem",
  ".MuiInputBase-input": {
    textAlign: "center",
  },
}))

const Mint = () => {
  const { isMobile } = useCheckViewport()
  const [isMinting, setIsMinting] = useState(false)
  const [name, setName] = useState("")

  const { profileRegistryContract, checkIfProfileMinted } = useSkellyContext()

  const { changeMintStep } = useSkellyStore()

  const handleMint = async () => {
    setIsMinting(true)
    try {
      const tx = await profileRegistryContract.mint(name, "0x", { value: ethers.parseEther("0.001") })
      // const tx = await profileRegistryContract.mintProfile(name)
      await tx.wait()
      const isMinted = await checkIfProfileMinted()
      console.log("checkIfProfileMinted", isMinted)
      changeMintStep(MintStep.REFERRAL_CODE)
    } catch (error) {
      console.log(error)
    } finally {
      setIsMinting(false)
    }
  }

  const checkIfUsernameUsed = async () => {
    const isUsernameUsed = await profileRegistryContract.isUsernameUsed(name)
    console.log("isUsernameUsed", isUsernameUsed)
    if (isUsernameUsed) {
      alert("Username already used")
    } else {
      handleMint()
    }
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const isInvalidName = useMemo(() => {
    return !name
  }, [name])

  const handleKeydown = e => {
    if (e.keyCode === 13) {
      handleMint()
    }
  }

  return (
    <Container>
      <StyledInputBase
        inputProps={{
          maxLength: 15,
        }}
        value={name}
        onChange={handleChangeName}
        autoFocus
        placeholder="Enter your name"
        onKeyDown={handleKeydown}
      />
      <Button gloomy={isInvalidName} color="primary" loading={isMinting} width={isMobile ? "23rem" : "28.2rem"} onClick={checkIfUsernameUsed}>
        {isMinting ? "Minting" : "Mint now"}
      </Button>
    </Container>
  )
}

export default Mint
